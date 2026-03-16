import type { TranslationKey } from '@/i18n/translationKeys';
import type { FormType } from '../BaseForm/BaseForm.types';

export type FieldName = 'username' | 'email' | 'password';

export interface InputFieldProps {
  id: string;
  type: 'text' | 'email' | 'password';
  name: string;
  autocomplete: 'on' | 'off';
  minLength?: string;
  maxLength?: string;
  pattern: RegExp;
  placeholderKey: TranslationKey;
  labelTextKey: TranslationKey;
  errorKey: TranslationKey;
}

export interface InputBlockProps extends InputFieldProps {
  formId: FormType;
  fieldName: FieldName;
}
