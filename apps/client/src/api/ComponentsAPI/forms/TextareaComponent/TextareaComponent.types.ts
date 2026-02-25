import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type TextareaComponentProperties = {
  value?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
} & Omit<BaseComponentProperties, 'tag'>;
