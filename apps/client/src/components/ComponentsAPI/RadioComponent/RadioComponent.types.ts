import type { BaseComponentProperties } from '../BaseComponent/BaseComponent.types';

export type RadioComponentProperties = {
  checked?: boolean;
  name?: string;
} & Omit<BaseComponentProperties, 'tag'>;
