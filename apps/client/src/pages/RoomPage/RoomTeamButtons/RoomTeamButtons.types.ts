import type { ButtonComponentProperties } from '@/api/ComponentsAPI';
import type { Teams } from '@shared/types/room';

export interface TeamButtonProps extends ButtonComponentProperties {
  teamName: Teams;
}
