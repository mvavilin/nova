import type { BaseComponentProps } from './base';

export type ButtonComponentProps = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  name?: string;
  value?: string;
} & BaseComponentProps;
