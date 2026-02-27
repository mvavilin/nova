import type { BaseComponentProperties } from '../../base/BaseComponent.types';

export type ContainerTag =
  | 'div'
  | 'section'
  | 'article'
  | 'main'
  | 'aside'
  | 'header'
  | 'footer'
  | 'nav'
  | 'figure'
  | 'figcaption'
  | 'fieldset'
  | 'form'
  | 'details'
  | 'summary'
  | 'dialog';

export type ContainerComponentProperties = {
  tag?: ContainerTag;
} & Omit<BaseComponentProperties, 'tag'>;
