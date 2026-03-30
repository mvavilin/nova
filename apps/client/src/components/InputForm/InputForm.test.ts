import { describe, it, expect, vi, beforeEach } from 'vitest';
import store from '@/store/store';
import InputForm from './InputForm';
import mockInitialState from '@__mocks__/store/state';
import { FormActionTypes } from '@/store/actions/form.actions';
import type { InputBlockProps } from './InputForm.types';
import { TranslationKeys } from '@/i18n/translationKeys';

vi.mock('@/store/store', () => ({
  default: {
    getState: vi.fn(),
    dispatch: vi.fn(),
    subscribe: vi.fn(() => vi.fn()),
  },
}));

vi.mock('@/i18n', () => ({
  t: (key: string): string => key,
}));

const getStateMock = vi.mocked(store.getState);
const dispatchMock = vi.mocked(store.dispatch);

const validParameters: InputBlockProps = {
  formId: 'registration',
  fieldName: 'username',
  id: 'userName',
  type: 'text',
  name: 'nameInput',
  autocomplete: 'off',
  pattern: /^[a-za-яё0-9-]+$/i,
  minLength: '2',
  maxLength: '16',
  placeholderKey: TranslationKeys.FORM_PLACEHOLDER_NAME,
  labelTextKey: TranslationKeys.FORM_LABEL_NAME,
  errorKey: TranslationKeys.FORM_ERROR_MESSAGE_NAME,
};

describe('InputForm: инициализация', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getStateMock.mockReturnValue(mockInitialState);
  });

  // В данном случае не используется перевод, а конкретные значения из const TranslationKeys (мокаем ф-ю перевода t)
  it('должен корректно рендерить input и label с текстом ключей', () => {
    const inputBlock = new InputForm(validParameters);
    const element = inputBlock.element;

    const input = element?.querySelector('input');
    const label = element?.querySelector('label');

    expect(input).toBeDefined();
    expect(input?.placeholder).toBe(validParameters.placeholderKey);
    expect(label?.textContent).toBe(validParameters.labelTextKey);
  });
});

describe('InputForm: правильное поведение при событии input', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getStateMock.mockReturnValue(mockInitialState);
  });

  it('1. Должен диспатчить FORM_UPDATE_FIELD при вводе текста', () => {
    const inputBlock = new InputForm(validParameters);
    const inputElement = inputBlock.element?.querySelector('input');
    // Имитируем ввод валидного текста
    if (!inputElement) return;
    inputElement.value = 'Alice';
    inputElement.dispatchEvent(new Event('input'));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: FormActionTypes.FORM_UPDATE_FIELD,
      payload: {
        formId: 'registration',
        fieldName: 'username',
        value: 'Alice',
        isValid: true,
      },
    });
  });

  it('2. Должен диспатчить isValid: false, если текст короче minLength', () => {
    const inputBlock = new InputForm(validParameters);
    const inputElement = inputBlock.element?.querySelector('input');
    if (!inputElement) return;
    inputElement.value = 'A';
    inputElement.dispatchEvent(new Event('input'));

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({ isValid: false }),
      })
    );
  });

  it('3. Должен отображать ошибку, если поле в сторе помечено как невалидное и измененное', () => {
    // Настраиваем состояние стора с ошибкой
    getStateMock.mockReturnValue({
      ...mockInitialState,
      registration: {
        ...mockInitialState.registration,
        fields: {
          username: { value: 'A', isValid: false, isChanged: true },
        },
      },
    });

    const inputBlock = new InputForm(validParameters);
    // Вызываем обновление (обычно происходит через subscribe)
    inputBlock['updateInputForm'](mockInitialState, { type: FormActionTypes.FORM_UPDATE_FIELD });

    const span = inputBlock.element?.querySelector('span');
    expect(span?.textContent).toBe(validParameters.errorKey);

    const input = inputBlock.element?.querySelector('input');
    expect(input?.classList.contains('border-red-500')).toBe(true);
  });
});
