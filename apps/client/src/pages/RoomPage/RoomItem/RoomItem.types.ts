import type { BaseComponentProperties } from '@/api/ComponentsAPI';

export interface RoomItemProps extends BaseComponentProperties {
  number: number | string;
  player: RoomPlayer;
}

interface RoomPlayer {
  username: string;
  role: string;
  id?: string;
  team?: string;
}
