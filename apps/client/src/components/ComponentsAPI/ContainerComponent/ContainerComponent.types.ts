import type { BaseComponentProperties } from '../BaseComponent/BaseComponent.types';

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

export type ContainerComponentProperties<T extends ContainerTag = 'div'> = Omit<
  BaseComponentProperties,
  'tag'
> & {
  tag?: T;
};
