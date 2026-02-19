import type { BaseComponentProps } from './base';

export type FormComponentProps = {
  action?: string;
  method?: 'get' | 'post';
} & BaseComponentProps;
