import type { BaseComponentProperties } from '../base-component/base-component.types';

export type TextComponentProperties = {
  tag?: 'p' | 'span' | 'div';
} & Omit<BaseComponentProperties, 'tag'>;
