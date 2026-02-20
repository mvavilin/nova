import type { BaseComponentProps } from './BaseComponent.types';

export type ButtonComponentProps = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  name?: string;
  value?: string;
} & BaseComponentProps;
