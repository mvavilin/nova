import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type RadioComponentProperties = {
  checked?: boolean;
  name?: string;
} & Omit<BaseComponentProperties, 'tag'>;
