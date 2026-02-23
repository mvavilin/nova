import type { BaseComponentProperties } from '../BaseComponent/base-component.types';

export type ContainerComponentProperties = Omit<BaseComponentProperties, 'tag'>;
