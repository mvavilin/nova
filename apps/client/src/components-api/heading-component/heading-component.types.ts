import type { BaseComponentProperties } from '../base-component/base-component.types';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingComponentProperties = {
  level?: HeadingLevel;
} & Omit<BaseComponentProperties, 'tag'>;
