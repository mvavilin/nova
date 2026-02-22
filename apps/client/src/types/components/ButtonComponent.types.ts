import type { BaseComponentProps } from '../../core/components/BaseComponent/BaseComponent.types';

export type ButtonComponentProps = {
  type?: HTMLButtonElement['type'];
  disabled?: boolean;
  name?: string;
  value?: string;
} & Omit<BaseComponentProps, 'tag'>;
