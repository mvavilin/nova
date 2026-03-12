import { InputComponent } from '@/api/ComponentsAPI';
import { ContainerComponent } from '@/api/ComponentsAPI';
import { LabelComponent } from '@/api/ComponentsAPI';
import { TextComponent } from '@/api/ComponentsAPI';
import { FormActions } from '@/store/actions/form.actions';
import type { FormType } from '../BaseForm/BaseFormTypes';
import type { FieldName, InputBlockProps } from './InputForm.type';
import type { Action } from '@/api/StateAPI';
import type { State } from '@/store/types/state';
import store from '@/store/store';
import { t } from '@/i18n';
import type { TranslationKey } from '@/i18n/translationKeys';

export default class InputForm extends ContainerComponent {
  private formId: FormType;
  private fieldName: FieldName;
  private input: InputComponent | null = null;
  private span: TextComponent | null = null;
  private label: LabelComponent | null = null;
  private pattern: RegExp;
  private labelKey: TranslationKey;
  private placeholderKey: TranslationKey;
  private errorKey: TranslationKey;

  constructor(parameters: InputBlockProps) {
    super({ classes: 'w-full flex flex-col self-center gap-1' });
    this.formId = parameters.formId;
    this.fieldName = parameters.fieldName;
    this.pattern = parameters.pattern;
    this.labelKey = parameters.labelTextKey;
    this.placeholderKey = parameters.placeholderKey;
    this.errorKey = parameters.errorKey;
    this.render(parameters);
    this.addSubscribe();
  }

  private render(parameters: InputBlockProps): void {
    this.label = new LabelComponent({
      classes: 'uppercase text-sm font-medium font-main',
      content: t(this.labelKey),
      htmlFor: parameters.id,
    });

    this.span = new TextComponent({
      tag: 'span',
      classes:
        'h-12 whitespace-pre-line text-red-600 text-xs font-medium transition-opacity duration-200',
    });

    this.input = new InputComponent({
      id: parameters.id,
      type: parameters.type,
      name: parameters.name,
      placeholder: t(this.placeholderKey),
      autocomplete: parameters.autocomplete,
      classes:
        'px-3 py-2 bg-white/60 border border-solid border-black rounded-md outline-none transition-colors duration-300 hover:cursor-pointer hover:border-green-600 focus:border-brand',
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

    this.appendChildren([this.label, this.input, this.span]);
  }

  private handleInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    const value = event.target.value;
    const isValid = this.pattern.test(value) && value.length >= Number(event.target.minLength);

    store.dispatch({
      type: FormActions.FORM_UPDATE_FIELD,
      payload: {
        formId: this.formId,
        fieldName: this.fieldName,
        value,
        isValid,
      },
    });
  }

  private addSubscribe(): void {
    this.addSubscriptions([
      store.subscribe((state, action) => this.updateInputForm(state, action)),
    ]);
  }

  private updateInputForm(_state: State, action: Action): void {
    const isFieldUpdate = action.type === FormActions.FORM_UPDATE_FIELD;
    const isLanguageSwitch = action.type === FormActions.SWITCH_LANGUAGE;
    if (isFieldUpdate || isLanguageSwitch) {
      const formState = store.getState()[this.formId];
      const fieldState = formState.fields[this.fieldName];
      if (!fieldState || !this.input || !this.label || !this.span) return;

      if (isLanguageSwitch) {
        this.input.setPlaceholder(t(this.placeholderKey));
        this.label.setContent(t(this.labelKey));
      }

      const isInvalid = fieldState.isChanged && !fieldState.isValid;

      this.input.toggleClasses('border-red-500', isInvalid);
      this.input.toggleClasses('focus:border-yellow-500', !isInvalid);
      this.span.setContent(isInvalid ? t(this.errorKey) : '');
    }
  }

  //Для возможности изменения инпутов через состояние формы
  public getFieldName(): FieldName {
    return this.fieldName;
  }

  public updateStatus(isValid: boolean): void {
    if (!this.input || !this.span) return;
    this.input.toggleClasses('border-red-500', !isValid);
    this.input.toggleClasses('focus:border-yellow-500', isValid);
    this.span.setContent(isValid ? '' : t(this.errorKey));
  }
}
