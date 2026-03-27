export const ROOM_STATUS = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHING: 'finishing',
} as const;

type RoomStatus = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS];

export interface RoomPreview {
  id: string;
  name: string;
  maxPlayers: number;
  playerCount: number;
  status: RoomStatus;
}

export const ROOM_PREVIEW_FIELDS = {
  ID: 'id',
  NAME: 'name',
  MAX_PLAYERS: 'maxPlayers',
  PLAYER_COUNT: 'playerCount',
  STATUS: 'status',
} as const;
