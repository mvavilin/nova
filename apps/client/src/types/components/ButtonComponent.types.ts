import type { BaseComponentProps } from '../../core/components/BaseComponent/BaseComponent.types';

export type ButtonComponentProps = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  name?: string;
  value?: string;
} & BaseComponentProps;
