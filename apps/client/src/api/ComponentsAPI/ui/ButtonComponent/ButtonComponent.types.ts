import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type ButtonComponentProperties = {
  type?: HTMLButtonElement['type'];
  disabled?: boolean;
  name?: string;
  value?: string;
} & Omit<BaseComponentProperties, 'tag'>;
