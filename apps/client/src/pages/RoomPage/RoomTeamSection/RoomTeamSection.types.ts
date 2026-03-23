import type { ContainerComponentProperties } from '@/api/ComponentsAPI';
import type { Player, Teams } from '@shared/types/room';

export interface TeamSectionProps extends ContainerComponentProperties {
  teamName: Teams;
  players: Player[];
}
