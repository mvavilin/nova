import { InputComponent } from '@/api/ComponentsAPI';
import { ContainerComponent } from '@/api/ComponentsAPI';
import { LabelComponent } from '@/api/ComponentsAPI';
import { TextComponent } from '@/api/ComponentsAPI';
import { FormActions } from '@/store/actions/form.actions';
import type { FormType } from '../BaseForm/BaseFormTypes';
import type { FieldName, InputBlockProps } from './InputForm.type';
import type { Action } from '@/api/StateAPI';
import type { State } from '@/store/types/state.types';
import store from '@/store/store';

export default class InputForm extends ContainerComponent {
  private formId: FormType;
  private fieldName: FieldName;
  private input: InputComponent | null = null;
  private span: TextComponent | null = null;
  private pattern: RegExp;
  private errorMessage: string;

  constructor(parameters: InputBlockProps) {
    super({ classes: 'w-full flex flex-col self-center gap-1' });
    this.formId = parameters.formId;
    this.fieldName = parameters.fieldName;
    this.pattern = parameters.pattern;
    this.errorMessage = parameters.errorMessage;
    this.render(parameters);
    this.addSubscribe();
  }

  private render(parameters: InputBlockProps): void {
    const label = new LabelComponent({
      classes: 'uppercase text-sm font-medium',
      content: parameters.labelText,
      htmlFor: parameters.id,
    });

    this.span = new TextComponent({
      tag: 'span',
      classes:
        'h-16 whitespace-pre-line text-dark-red text-xs font-medium transition-opacity duration-200',
    });

    this.input = new InputComponent({
      id: parameters.id,
      type: parameters.type,
      name: parameters.name,
      placeholder: parameters.placeholder,
      autocomplete: parameters.autocomplete,
      classes:
        'px-3 py-2 bg-white/40 border border-solid border-black rounded-md outline-none transition-colors duration-300 hover:cursor-pointer hover:bg-white/60 focus:border-yellow-400',
    });

    if (parameters.minLength && parameters.maxLength) {
      this.input.setAttributes({
        minLength: parameters.minLength,
        maxLength: parameters.maxLength,
      });
    }

    this.input.setListeners({
      input: (event: Event) => {
        this.handleInput(event);
      },
    });

    this.appendChildren([label, this.input, this.span]);
  }

  private handleInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    const value = event.target.value;
    const isValid = this.pattern.test(value) && value.length >= Number(event.target.minLength);
    const errorMessage = isValid ? '' : this.errorMessage;
    store.dispatch({
      type: FormActions.FORM_UPDATE_FIELD,
      payload: {
        formId: this.formId,
        fieldName: this.fieldName,
        value,
        isValid,
        errorMessage,
      },
    });
  }

  private addSubscribe(): void {
    this.addSubscriptions([
      store.subscribe((state, action) => this.updateInputForm(state, action)),
    ]);
  }

  private updateInputForm(_state: State, action: Action): void {
    if (action.type === FormActions.FORM_UPDATE_FIELD) {
      const formState = store.getState()[this.formId];
      const fieldState = formState.fields[this.fieldName];

      if (!fieldState) return;
      if (fieldState.isChanged) {
        if (!(this.input && this.span)) return;
        this.input.toggleClasses('border-red-500', !fieldState.isValid);
        this.input.toggleClasses('focus:border-yellow-500', fieldState.isValid);
        this.span.setContent(fieldState.isValid ? '' : fieldState.error);
      }
    }
  }

  //Для возможности изменения инпутов через состояние формы
  public getFieldName(): FieldName {
    return this.fieldName;
  }

  public updateStatus(isValid: boolean, error: string): void {
    if (!this.input || !this.span) return;
    this.input.toggleClasses('border-red-500', !isValid);
    this.input.toggleClasses('focus:border-yellow-500', isValid);
    this.span.setContent(isValid ? '' : error);
  }
}
