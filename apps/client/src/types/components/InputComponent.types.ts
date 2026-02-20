import type { BaseComponentProps } from './BaseComponent.types';

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'time'
  | 'color'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'hidden'
  | 'range'
  | 'submit'
  | 'reset'
  | 'button';

type RequireNameOrId = { name: string; id?: string } | { id: string; name?: string };

export type InputComponentProps = ({
  type?: InputType;
  placeholder?: string;
  value?: string;
} & BaseComponentProps) &
  RequireNameOrId;
