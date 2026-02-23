import type { BaseComponentProperties } from '../base-component/base-component.types';

export type InputComponentProperties = {
  type?: HTMLInputElement['type'];
  name?: string;
  placeholder?: string;
  value?: string;
} & Omit<BaseComponentProperties, 'tag'>;
