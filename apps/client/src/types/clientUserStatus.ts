export enum AuthStatus {
  UNAUTHORIZED = 'UNAUTHORIZED',
  AUTHORIZED = 'AUTHORIZED',
}

export enum SubStatus {
  IN_LOBBY = 'IN_LOBBY',
  IN_ROOM = 'IN_ROOM',
  IN_GAME = 'IN_GAME',
  IN_SOLO_SETUP = 'IN_SOLO_SETUP',
  IN_SOLO_GAME = 'IN_SOLO_GAME',
  IN_RESULTS = 'IN_RESULTS',
  IN_PROFILE = 'IN_PROFILE',
}

enum Team {
  RED = 'RED',
  BLUE = 'BLUE',
}

enum GameRole {
  SPYMASTER = 'SPYMASTER',
  OPERATIVE = 'OPERATIVE',
}

export interface Context {
  roomCode?: string;
  gameId?: string;
  soloGameId?: string;
  resultId?: string;
  team?: Team;
  role?: GameRole;
}
