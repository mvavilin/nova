export type inputBlockType = {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  autocomplete: 'on' | 'off';
  minLength?: string;
  maxLength?: string;
  labelText: string;
};
