import type { ContainerComponentProperties } from '@/api/ComponentsAPI';

export interface RoomInfoBlockProps extends ContainerComponentProperties {
  roomName: string;
  roomId: string;
  currentCount: number;
  totalCount: number;
}
