import type { BaseComponentProperties } from '../base-component/base-component.types';

export type LinkComponentProperties = {
  href?: string;
  target?: HTMLAnchorElement['target'];
  rel?: string;
  content?: string | number;
} & Omit<BaseComponentProperties, 'tag'>;
