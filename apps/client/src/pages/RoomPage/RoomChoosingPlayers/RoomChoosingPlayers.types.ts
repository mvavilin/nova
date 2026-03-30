import type { ContainerComponentProperties } from '@/api/ComponentsAPI';
import type { Player } from '@shared/types/room';

export interface RoomChoosingUsersProps extends ContainerComponentProperties {
  players: Player[];
}
