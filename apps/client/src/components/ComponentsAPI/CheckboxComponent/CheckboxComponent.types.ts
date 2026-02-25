import type { BaseComponentProperties } from '../BaseComponent/BaseComponent.types';

export type CheckboxComponentProperties = {
  checked?: boolean;
} & Omit<BaseComponentProperties, 'tag'>;
