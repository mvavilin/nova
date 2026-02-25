import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type ListComponentProperties = {
  type?: 'ul' | 'ol';
  items?: (string | number)[];
} & Omit<BaseComponentProperties, 'tag'>;
