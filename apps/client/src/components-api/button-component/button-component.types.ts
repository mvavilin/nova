import type { BaseComponentProperties } from '../base-component/base-component.types';

export type ButtonComponentProperties = {
  type?: HTMLButtonElement['type'];
  disabled?: boolean;
  name?: string;
  value?: string;
} & Omit<BaseComponentProperties, 'tag'>;
