import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type SelectComponentProperties = {
  value?: string;
  options?: { value: string; label: string; selected?: boolean }[];
  multiple?: boolean;
} & Omit<BaseComponentProperties, 'tag'>;
