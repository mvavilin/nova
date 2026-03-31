import type { Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../packages/shared/src/socketEvents.ts';
import type { SocketData } from '../../types/types.ts';
import { roomManager, socketIdMap } from './sessionHandlers.ts';
import { io } from '../../app.ts';
import { logger } from '../logger/logger.ts';

export function setupProfileHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  setupEnterToProfileHandler(socket);
  setupLeaveProfileHandler(socket);
  setupSendProfileInfoHandler(socket);
}

function setupEnterToProfileHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;

  socket.on('profile:enter', () => {
    const response = roomManager.addPlayerToProfile(userId);

    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    } else {
      const { profileInfo } = response;
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('profile:entered', { profileInfo });
        logger.emit(userId, 'profile:entered', { profileInfo });
      }
    }
  });
}

function setupLeaveProfileHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;

  socket.on('profile:leave', () => {
    const response = roomManager.leaveProfile(userId);

    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    } else {
      const { roomPreviews } = response;
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('profile:left', { roomPreviews });
        logger.emit(userId, 'profile:left', { roomPreviews });
      }
    }
  });
}

function setupSendProfileInfoHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;

  socket.on('profile:ask-info', () => {
    const response = roomManager.getProfileInfo(userId);

    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    } else {
      const { profileInfo } = response;
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('profile:entered', { profileInfo });
        logger.emit(userId, 'profile:entered', { profileInfo });
      }
    }
  });
}
