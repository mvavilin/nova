import type { BaseComponentProperties } from '../BaseComponent/base-component.types';

export type InputComponentProperties = {
  type?: HTMLInputElement['type'];
  name?: string;
  placeholder?: string;
  value?: string;
} & Omit<BaseComponentProperties, 'tag'>;
