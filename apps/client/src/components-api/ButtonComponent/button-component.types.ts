import type { BaseComponentProperties } from '../BaseComponent/base-component.types';

export type ButtonComponentProperties = {
  type?: HTMLButtonElement['type'];
  disabled?: boolean;
  name?: string;
  value?: string;
} & Omit<BaseComponentProperties, 'tag'>;
