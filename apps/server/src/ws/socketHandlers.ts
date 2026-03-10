import type { Server, Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../packages/shared/src/socketEvents.ts';
import type { RoomManager } from '../rooms/roomManager.ts';
import { socketIdMap } from '../app.ts';
import type { SocketData } from '../types/types.ts';

export function setupSocketHandlers(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  roomManager: RoomManager
): void {
  const userId = socket.data.userId;

  socket.on('room:create', ({ settings }) => {
    const { payload, recipients } = roomManager.createRoom(settings);
    for (const recipient of recipients) {
      const idSet = socketIdMap.get(recipient);
      if (idSet) {
        io.to([...idSet]).emit('room:created', { roomPreview: payload });
      }
    }
  });

  socket.on('room:ask-list', () => {
    const { payload } = roomManager.getRoomPreviews();
    const idSet = socketIdMap.get(userId);
    if (idSet) {
      io.to([...idSet]).emit('room:send-list', { roomPreviews: payload });
    }
  });
}
