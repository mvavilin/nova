import type { Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../packages/shared/src/socketEvents.ts';
import { roomManager, socketIdMap } from './sessionHandlers.ts';
import { io } from '../../app.ts';
import { logger } from '../logger/logger.ts';
import type { SocketData } from '../../types/types.ts';

export function setupGameHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  setupGameAddPlayer(socket);
}

function setupGameAddPlayer(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;

  socket.on('game:add-player', () => {
    const response = roomManager.addPlayerToGame(userId);
    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    } else {
      const { gameInfo, cutGameInfo, spymasterIds, agentIds } = response;

      for (const spymasterId of spymasterIds) {
        const socketId = socketIdMap.get(spymasterId);
        if (socketId) {
          io.to(socketId).emit('game:start', { gameInfo });
        }
      }

      for (const agentId of agentIds) {
        const socketId = socketIdMap.get(agentId);
        if (socketId) {
          io.to(socketId).emit('game:start', { gameInfo: cutGameInfo });
        }
      }
    }
  });
}
