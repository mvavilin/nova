import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type FormComponentProperties = {
  action?: string;
  method?: 'get' | 'post';
  autocomplete?: 'on' | 'off';
} & Omit<BaseComponentProperties, 'tag'>;
