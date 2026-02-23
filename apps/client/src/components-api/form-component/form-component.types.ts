import type { BaseComponentProperties } from '../base-component/base-component.types';

export type FormComponentProperties = {
  action?: string;
  method?: 'get' | 'post';
} & Omit<BaseComponentProperties, 'tag'>;
