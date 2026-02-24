import type { BaseComponentProperties } from '../base-component/base-component.types';

export type ImageComponentProperties = {
  source?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
} & Omit<BaseComponentProperties, 'tag'>;
