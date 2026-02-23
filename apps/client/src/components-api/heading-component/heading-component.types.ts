import type { BaseComponentProperties } from '../base-component/base-component.types';

export type HeadingComponentProperties = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & Omit<BaseComponentProperties, 'tag'>;
