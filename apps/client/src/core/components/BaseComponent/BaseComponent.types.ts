import BaseComponent from './BaseComponent';

export type ListenersMap = Record<string, EventListener>;
export type AttributeValue = string | number | boolean | null | undefined;
export type AttributesMap = Record<string, AttributeValue>;
export type Namespace = 'html' | 'svg';
export type DOMElement = HTMLElement | SVGElement;

export type BaseComponentProps = {
  tag?: string;
  namespace?: 'html' | 'svg';
  classes?: string[] | string;
  children?: BaseComponent[];
  listeners?: ListenersMap;
  attributes?: AttributesMap;
  content?: string | number;
  id?: string;
  title?: string;
};
