export type inputBlockType = {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  autocomplete: 'on' | 'off';
  minLength?: string;
  maxLength?: string;
  pattern: RegExp;
  errorMessage: string;
  labelText: string;
};
