import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type LinkComponentProperties = {
  href?: string;
  target?: HTMLAnchorElement['target'];
  rel?: string;
  content?: string | number;
} & Omit<BaseComponentProperties, 'tag'>;
