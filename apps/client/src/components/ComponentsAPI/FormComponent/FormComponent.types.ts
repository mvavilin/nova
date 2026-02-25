import type { BaseComponentProperties } from '../BaseComponent/BaseComponent.types';

export type FormComponentProperties = {
  action?: string;
  method?: 'get' | 'post';
} & Omit<BaseComponentProperties, 'tag'>;
