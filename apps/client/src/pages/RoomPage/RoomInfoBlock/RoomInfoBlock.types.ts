import type { ContainerComponentProperties } from '@/api/ComponentsAPI';

export interface RoomInfoBlockProps extends ContainerComponentProperties {
  roomName: string;
  currentCount: number;
  totalCount: number;
}
