import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type CheckboxComponentProperties = {
  checked?: boolean;
} & Omit<BaseComponentProperties, 'tag'>;
