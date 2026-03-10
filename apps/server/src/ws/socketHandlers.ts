import type { Server, Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../packages/shared/src/socketEvents.ts';
import type { RoomManager } from '../rooms/roomManager.ts';
import { socketIdMap } from '../app.ts';

export function setupSocketHandlers(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents>,
  roomManager: RoomManager
): void {
  socket.on('room:create', ({ settings }) => {
    const { payload, recipients } = roomManager.createRoom(settings);
    for (const recipient of recipients) {
      const idSet = socketIdMap.get(recipient);
      if (idSet) {
        for (const socketId of idSet) {
          io.to(socketId).emit('room:created', { roomPreview: payload });
        }
      }
    }
  });
}
