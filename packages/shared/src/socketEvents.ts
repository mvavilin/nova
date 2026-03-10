import type { RoomPreview, RoomSettings } from './types/room.ts';

type ClientEvent =
  | { type: 'room:create'; payload: { settings: RoomSettings } }
  | { type: 'room:ask-list' };

type ServerEvent =
  | { type: 'session:token'; payload: { sessionToken: string } }
  | { type: 'room:send-list'; payload: { roomPreviews: RoomPreview[] } }
  | { type: 'room:created'; payload: { roomPreview: RoomPreview } };

type EventName<T> = T extends { type: infer K } ? K : never;

type EventPayload<T> = T extends { payload: infer P }
  ? P extends undefined
    ? () => void
    : (data: P) => void
  : () => void;

type DiscriminatedUnionToSocketEvents<T extends { type: string }> = {
  [K in EventName<T>]: EventPayload<Extract<T, { type: K }>>;
};

export type ServerToClientEvents = DiscriminatedUnionToSocketEvents<ServerEvent>;

export type ClientToServerEvents = DiscriminatedUnionToSocketEvents<ClientEvent>;
