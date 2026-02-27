import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type LabelComponentProperties = {
  htmlFor?: string;
} & Omit<BaseComponentProperties, 'tag'>;
