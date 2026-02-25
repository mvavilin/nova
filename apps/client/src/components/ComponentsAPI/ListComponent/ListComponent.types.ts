import type { BaseComponentProperties } from '../BaseComponent/BaseComponent.types';

export type ListComponentProperties = {
  type?: 'ul' | 'ol';
  items?: (string | number)[];
} & Omit<BaseComponentProperties, 'tag'>;
