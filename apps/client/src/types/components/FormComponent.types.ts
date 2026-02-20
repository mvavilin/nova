import type { BaseComponentProps } from './BaseComponent.types';

export type FormComponentProps = {
  action?: string;
  method?: 'get' | 'post';
} & BaseComponentProps;
