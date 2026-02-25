import type { BaseComponentProperties } from '../BaseComponent/BaseComponent.types';

export type TextareaComponentProperties = {
  value?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
} & Omit<BaseComponentProperties, 'tag'>;
