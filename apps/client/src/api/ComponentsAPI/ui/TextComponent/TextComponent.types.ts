import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type TextTag =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'em'
  | 'small'
  | 'mark'
  | 'b'
  | 'i'
  | 'abbr'
  | 'cite'
  | 'q'
  | 'time';

export type TextComponentProperties = {
  tag?: TextTag;
} & Omit<BaseComponentProperties, 'tag'>;
