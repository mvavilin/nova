import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type TextareaComponentProperties = {
  value?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  required?: boolean;
  autocomplete?: 'on' | 'off';
} & Omit<BaseComponentProperties, 'tag'>;
