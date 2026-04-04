import { InputComponent } from '@/api/ComponentsAPI';
import { ContainerComponent } from '@/api/ComponentsAPI';
import { LabelComponent } from '@/api/ComponentsAPI';
import { TextComponent } from '@/api/ComponentsAPI';
import { FormActionTypes } from '@/store/actions/form.actions';
import type { FormType } from '../BaseForm/BaseForm.types';
import type { FieldName, InputBlockProps } from './InputForm.types';
import type { Action } from '@/api/StateAPI';
import type { State } from '@/store/types/state';
import store from '@/store/store';
import { t } from '@/i18n';
import type { TranslationKey } from '@/i18n/translationKeys';
import { AppActionTypes } from '@/store/actions';

export default class InputForm extends ContainerComponent {
  private formId: FormType;
  private fieldName: FieldName;
  private input: InputComponent | null = null;
  private tooltip: TextComponent | null = null;
  private label: LabelComponent | null = null;
  private labelKey: TranslationKey;
  private placeholderKey: TranslationKey;
  private errorKey: TranslationKey;
  private pattern?: RegExp;
  private unsubscribe: () => void;

  constructor(parameters: InputBlockProps) {
    super({ classes: 'w-full flex flex-col self-center gap-1' });
    this.formId = parameters.formId;
    this.fieldName = parameters.fieldName;
    this.labelKey = parameters.labelTextKey;
    this.placeholderKey = parameters.placeholderKey;
    this.errorKey = parameters.errorKey;
    if (parameters.pattern) this.pattern = parameters.pattern;

    this.render(parameters);

    this.unsubscribe = store.subscribe((state, action) => this.updateInputForm(state, action));
  }

  private render(parameters: InputBlockProps): void {
    this.label = new LabelComponent({
      classes: 'uppercase text-sm md:text-base font-medium font-main',
      content: t(this.labelKey),
      htmlFor: parameters.id,
    });

    this.tooltip = new TextComponent({
      tag: 'span',
      classes:
        'min-h-[32px] whitespace-pre-line text-red-600 text-xs font-medium transition-opacity duration-200',
    });

    this.input = new InputComponent({
      id: parameters.id,
      type: parameters.type,
      name: parameters.name,
      placeholder: t(this.placeholderKey),
      autocomplete: parameters.autocomplete,
      classes:
        'text-sm md:text-base px-3 py-2 bg-white/60 border border-solid border-black rounded-md outline-none transition-colors duration-300 hover:border-green-600 focus:border-brand',
    });

    if (parameters.minLength) {
      this.input.setAttributes({
        minLength: parameters.minLength,
      });
    }
    if (parameters.maxLength) {
      this.input.setAttributes({
        maxLength: parameters.maxLength,
      });
    }

    this.input.setListeners({
      input: (event: Event) => {
        this.handleInput(event);
      },
    });

    this.appendChildren([this.label, this.input, this.tooltip]);
  }

  private handleInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    const value = event.target.value.trim().replaceAll(/\s+/g, ' ');

    const isValid = this.pattern
      ? this.pattern.test(value) && value.length >= Number(event.target.minLength)
      : value.length >= Number(event.target.minLength);

    store.dispatch({
      type: FormActionTypes.FORM_UPDATE_FIELD,
      payload: {
        formId: this.formId,
        fieldName: this.fieldName,
        value,
        isValid,
      },
    });
  }

  private updateInputForm(_state: State, action: Action): void {
    const isFieldUpdate = action.type === FormActionTypes.FORM_UPDATE_FIELD;
    const isLanguageSwitch = action.type === AppActionTypes.SWITCH_LANGUAGE;
    if (isFieldUpdate || isLanguageSwitch) {
      const formState = store.getState()[this.formId];
      const fieldState = formState.fields[this.fieldName];
      if (!fieldState || !this.input || !this.label || !this.tooltip) return;

      if (isLanguageSwitch) {
        this.input.setPlaceholder(t(this.placeholderKey));
        this.label.setContent(t(this.labelKey));
      }

      const isInvalid = fieldState.isChanged && !fieldState.isValid;

      this.input.toggleClasses('border-red-500', isInvalid);
      this.input.toggleClasses('focus:border-yellow-500', !isInvalid);
      this.tooltip.setContent(isInvalid ? t(this.errorKey) : '');
    }
  }

  //Для возможности изменения инпутов через состояние формы
  public getFieldName(): FieldName {
    return this.fieldName;
  }

  public updateStatus(isValid: boolean): void {
    if (!this.input || !this.tooltip) return;
    this.input.toggleClasses('border-red-500', !isValid);
    this.input.toggleClasses('focus:border-yellow-500', isValid);
    this.tooltip.setContent(isValid ? '' : t(this.errorKey));
  }

  public override destroy(): this {
    this.unsubscribe();
    super.destroy();
    return this;
  }
}
