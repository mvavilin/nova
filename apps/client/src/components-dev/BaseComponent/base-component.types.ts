import BaseComponent from './base-component';

// TODO: вынести в константы
export const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export type ListenersMap = Record<string, EventListener>;
export type AttributeValue = string | number | boolean | null | undefined;
export type AttributesMap = Record<string, AttributeValue>;
export type Namespace = typeof HTML_NAMESPACE | typeof SVG_NAMESPACE;
export type DOMElement = HTMLElement | SVGElement;

export type BaseComponentProperties = {
  tag?: string;
  namespace?: Namespace;
  classes?: string[] | string;
  children?: BaseComponent[];
  listeners?: ListenersMap;
  attributes?: AttributesMap;
  content?: string | number;
  id?: string;
  title?: string;
};
