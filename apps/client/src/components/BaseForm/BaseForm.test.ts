import { describe, it, expect, vi, beforeEach } from 'vitest';
import store from '@/store/store';
import BaseForm from './BaseForm';
import mockInitialState from '@__mocks__/store/state';
import { HeadingComponent, ButtonComponent } from '@/api/ComponentsAPI';
import type { BaseFormProps } from './BaseForm.types';
import { FormActions } from '@/store/actions/form.actions';

// 1. Мокаем стор
vi.mock('@/store/store', () => ({
  default: {
    getState: vi.fn(),
    dispatch: vi.fn(),
    subscribe: vi.fn(() => vi.fn()),
  },
}));

// 2. Изолируем UI (Overlay и Loader)
vi.mock('../ui', () => ({
  Overlay: class {
    public show(): void {}
    public hide(): void {}
  },
}));
vi.mock('../ui/Loader/Loader', () => ({ default: class {} }));
const getStateMock = vi.mocked(store.getState);
const dispatchMock = vi.mocked(store.dispatch);

// 3. Создаем типизированные моки компонентов
const mockTitle: HeadingComponent = Object.assign(Object.create(null), {
  getElement: () => document.createElement('h1'),
  setParent: vi.fn(),
  appendChildren: vi.fn(),
});

const mockButton: ButtonComponent = Object.assign(Object.create(null), {
  getElement: () => document.createElement('button'),
  setParent: vi.fn(),
  setAttributes: vi.fn(),
  removeAttributes: vi.fn(),
  toggleClasses: vi.fn(),
});

const validParameters: BaseFormProps = {
  formId: 'registration',
  title: mockTitle,
  buttonSubmit: mockButton,
  inputArray: [],
};

describe('BaseForm: инициализация', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getStateMock.mockReturnValue(mockInitialState);
  });

  it('должен создавать элемент формы с атрибутом method="post"', () => {
    const form = new BaseForm(validParameters);
    expect(form.element?.tagName).toBe('FORM');
    expect(form.element?.getAttribute('method')).toBe('post');
  });
});

describe('BaseForm: управление состоянием кнопки Submit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getStateMock.mockReturnValue(mockInitialState);
  });

  it('должен блокировать кнопку (disabled), если форма невалидна', () => {
    // Подменяем стейт на невалидный
    getStateMock.mockReturnValue({
      ...mockInitialState,
      registration: { ...mockInitialState.registration, isFormValid: false },
    });

    new BaseForm(validParameters);

    expect(mockButton.setAttributes).toHaveBeenCalledWith({ disabled: 'disabled' });
    expect(mockButton.toggleClasses).toHaveBeenCalledWith('disabled-state', true);
  });

  it('должен разблокировать кнопку, если форма валидна', () => {
    // Подменяем стейт на валидный
    getStateMock.mockReturnValue({
      ...mockInitialState,
      registration: { ...mockInitialState.registration, isFormValid: true },
    });

    new BaseForm(validParameters);

    expect(mockButton.removeAttributes).toHaveBeenCalledWith('disabled');
    expect(mockButton.toggleClasses).toHaveBeenCalledWith('disabled-state', false);
  });
});

describe('BaseForm: сбор данных (getFormInputValues)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getStateMock.mockReturnValue(mockInitialState);
  });

  it('должен корректно извлекать значения полей из Store', () => {
    getStateMock.mockReturnValue({
      ...mockInitialState,
      registration: {
        ...mockInitialState.registration,
        fields: {
          username: { value: 'Alice', isValid: true, isChanged: true },
          email: { value: 'alice@example.com', isValid: true, isChanged: true },
          password: { value: '!Secret123', isValid: true, isChanged: true },
        },
      },
    });

    const form = new BaseForm(validParameters);
    const values = form.getFormInputValues();

    expect(values).toEqual({
      username: 'Alice',
      email: 'alice@example.com',
      password: '!Secret123',
    });
  });
});

describe('BaseForm: обработка события Submit (отправка данных)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getStateMock.mockReturnValue(mockInitialState);
  });

  it('должен вызывать dispatch экшена FORM/FETCH_DATA при валидной форме', () => {
    // Устанавливаем валидное состояние
    getStateMock.mockReturnValue({
      ...mockInitialState,
      registration: {
        ...mockInitialState.registration,
        fields: {
          username: { value: 'Alice', isValid: true, isChanged: true },
          email: { value: 'alice@example.com', isValid: true, isChanged: true },
          password: { value: '!Secret123', isValid: true, isChanged: true },
        },
        isFormValid: true,
      },
    });

    const form = new BaseForm(validParameters);
    form.element?.dispatchEvent(new Event('submit'));

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: FormActions.FETCH_DATA,
        payload: expect.objectContaining({
          formId: 'registration',
          formData: { username: 'Alice', email: 'alice@example.com', password: '!Secret123' },
          loader: expect.any(Object),
          onFinished: expect.any(Function),
        }),
      })
    );
  });

  it('не должен вызывать dispatch экшена FORM/FETCH_DATA, если форма невалидна', () => {
    // 1. Устанавливаем НЕВАЛИДНОЕ состояние в сторе
    getStateMock.mockReturnValue({
      ...mockInitialState,
      registration: {
        ...mockInitialState.registration,
        fields: {
          username: { value: 'A', isValid: false, isChanged: true },
        },
        isFormValid: false,
      },
    });

    const form = new BaseForm(validParameters);
    form.element?.dispatchEvent(new Event('submit'));

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
