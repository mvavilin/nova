import type { ContainerComponentProperties } from '@/api/ComponentsAPI';

export interface RoomUserProps extends ContainerComponentProperties {
  username: string;
  id?: string;
}
