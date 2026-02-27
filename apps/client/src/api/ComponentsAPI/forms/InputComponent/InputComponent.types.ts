import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type InputComponentProperties = {
  type?: HTMLInputElement['type'];
  name?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  autocomplete?: 'on' | 'off';
} & Omit<BaseComponentProperties, 'tag'>;
