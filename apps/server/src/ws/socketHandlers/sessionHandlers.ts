import type { Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../packages/shared/src/socketEvents.ts';
import { RoomManager } from '../../rooms/roomManager.ts';
import { RECONNECT_MAX_TIME, type SocketData } from '../../types/types.ts';
import { setupRoomHandlers } from './roomHandlers.ts';
import { io } from '../../app.ts';
import { logger } from '../logger/logger.ts';

const timerMap = new Map<string, NodeJS.Timeout>();
export const roomManager = new RoomManager();
export const socketIdMap = new Map<string, string>();

export function setupConnection(): void {
  io.on(
    'connection',
    (socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>) => {
      const { userId, username } = socket.data;

      const userSocketCount = [...io.sockets.sockets].filter(
        (s) => s[1].data.userId === userId
      ).length;

      if (userSocketCount > 1) {
        socket.emit('error', { code: 'ALREADY_ONLINE' });
        logger.emit(userId, 'error', { code: 'ALREADY_ONLINE' });
        socket.disconnect();
      } else {
        const status = roomManager.getStatus(userId, username);
        const { userStatus, player, recipients } = status;

        socket.emit('session:connect', { userStatus });
        logger.emit(userId, 'session:connect', { userStatus });

        socket.emit('session:token', { sessionToken: socket.data.sessionToken });
        logger.emit(userId, 'session:token', { sessionToken: socket.data.sessionToken });

        for (const recipient of recipients) {
          const socketId = socketIdMap.get(recipient);
          if (socketId) {
            io.to(socketId).emit('session:player-connected', { player });
            logger.emit(recipient, 'session:player-connected', { player });
          }
        }
        clearTimeout(timerMap.get(userId));
        timerMap.delete(userId);
        logger.info('connect:', userId);
      }

      socketIdMap.set(userId, socket.id);

      setupDisconnect(socket);
      setupAskStatusHandler(socket);
      setupRoomHandlers(socket);
    }
  );
}

function setupDisconnect(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  socket.on('disconnect', () => {
    const { userId, username } = socket.data;
    logger.info('disconnect:', userId);

    const status = roomManager.getStatus(userId, username);
    const { player, recipients } = status;
    for (const recipient of recipients) {
      const socketId = socketIdMap.get(recipient);
      if (socketId) {
        io.to(socketId).emit('session:player-disconnected', { player });
        logger.emit(recipient, 'session:player-disconnected', { player });
      }
    }

    timerMap.set(
      userId,
      setTimeout(() => {
        for (const recipient of recipients) {
          const socketId = socketIdMap.get(recipient);
          if (socketId) {
            io.to(socketId).emit('session:player-exit', { player });
            logger.emit(recipient, 'session:player-exit', { player });
          }
        }

        const response = roomManager.leaveRoom(userId);
        if ('payload' in response) {
          const { payload, lobbyRecipients } = response;
          for (const recipient of lobbyRecipients) {
            const socketId = socketIdMap.get(recipient);
            if (socketId) {
              io.to(socketId).emit('room:update-review', { roomPreview: payload });
              logger.emit(recipient, 'room:update-review', { roomPreview: payload });
            }
          }
          roomManager.removePlayerFromLobby(userId);
        }
        timerMap.delete(userId);
      }, RECONNECT_MAX_TIME)
    );
  });
}

function setupAskStatusHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId, username } = socket.data;

  socket.on('session:ask-status', () => {
    const { userStatus } = roomManager.getStatus(userId, username);
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      io.to(socketId).emit('session:send-status', { userStatus });
      logger.emit(userId, 'session:send-status', { userStatus });
    }
  });
}
