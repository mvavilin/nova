import { AuthStatus } from '@state/auth/auth.types';

enum Team {
  RED = 'RED',
  BLUE = 'BLUE',
}

enum GameRole {
  SPYMASTER = 'SPYMASTER',
  OPERATIVE = 'OPERATIVE',
}

export enum AuthorizedSubStatus {
  IN_LOBBY = 'IN_LOBBY',
  IN_ROOM = 'IN_ROOM',
  IN_GAME = 'IN_GAME',
  IN_SOLO_SETUP = 'IN_SOLO_SETUP',
  IN_SOLO_GAME = 'IN_SOLO_GAME',
  IN_RESULTS = 'IN_RESULTS',
  IN_PROFILE = 'IN_PROFILE',
}

export interface StatusContext {
  roomCode?: string;
  gameId?: string;
  soloGameId?: string;
  resultId?: string;
  team?: Team;
  role?: GameRole;
}

export enum UserType {
  UNAUTHORIZED = AuthStatus.UNAUTHORIZED,
  AUTHORIZED = AuthStatus.AUTHORIZED,
}

export type UserStatus =
  | { type: UserType.UNAUTHORIZED }
  | { type: UserType.AUTHORIZED; subStatus: AuthorizedSubStatus; context?: StatusContext };
