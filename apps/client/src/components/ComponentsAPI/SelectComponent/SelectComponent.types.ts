import type { BaseComponentProperties } from '../BaseComponent/BaseComponent.types';

export type SelectComponentProperties = {
  value?: string;
  options?: { value: string; label: string; selected?: boolean }[];
  multiple?: boolean;
} & Omit<BaseComponentProperties, 'tag'>;
