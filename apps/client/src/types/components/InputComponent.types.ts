import type { BaseComponentProps } from '../../core/components/BaseComponent/BaseComponent.types';

export type InputComponentProps = {
  type?: HTMLInputElement['type'];
  name?: string;
  placeholder?: string;
  value?: string;
} & Omit<BaseComponentProps, 'tag'>;
