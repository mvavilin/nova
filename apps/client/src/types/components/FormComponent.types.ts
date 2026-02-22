import type { BaseComponentProps } from '../../core/components/BaseComponent/BaseComponent.types';

export type FormComponentProps = {
  action?: string;
  method?: 'get' | 'post';
} & Omit<BaseComponentProps, 'tag'>;
