import type { BaseComponentProps } from '../../core/components/BaseComponent/BaseComponent.types';

export type ContainerComponentProps = Omit<BaseComponentProps, 'tag'>;
