import type { BaseComponentProperties } from '../base-component/base-component.types';

export type ContainerComponentProperties = Omit<BaseComponentProperties, 'tag'>;
