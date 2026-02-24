import type { BaseComponentProperties } from '../base-component/base-component.types';

export type ListComponentProperties = {
  type?: 'ul' | 'ol';
  items?: (string | number)[];
} & Omit<BaseComponentProperties, 'tag'>;
