import type { BaseComponentProperties } from '../BaseComponent/base-component.types';

export type FormComponentProperties = {
  action?: string;
  method?: 'get' | 'post';
} & Omit<BaseComponentProperties, 'tag'>;
