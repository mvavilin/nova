const ROOM_STATUS = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHING: 'finishing',
} as const;

type RoomStatus = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS];

export const ROOM_STATUS_RU: Record<RoomStatus, string> = {
  [ROOM_STATUS.WAITING]: 'Ожидание',
  [ROOM_STATUS.PLAYING]: 'Игра',
  [ROOM_STATUS.FINISHING]: 'Завершение',
};

export interface RoomPreview {
  id: string;
  name: string;
  maxPlayers: number;
  playerCount: number;
  status: RoomStatus;
}
