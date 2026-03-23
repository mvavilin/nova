import type { Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../packages/shared/src/socketEvents.ts';
import type { SocketData } from '../../types/types.ts';
import { roomManager, socketIdMap } from './sessionHandlers.ts';
import { io } from '../../app.ts';
import { logger } from '../logger/logger.ts';

export function setupRoomHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  setupCreateRoomHandlers(socket);
  setupAskListHandlers(socket);
  setupRoomSearchHandlers(socket);
  setupRoomJoinEvent(socket);
  setupRoomLeaveEvent(socket);
  setupSendRoomInfoEvent(socket);
}

function setupCreateRoomHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;
  socket.on('room:create', ({ settings }) => {
    logger.on(userId, 'room:create', { settings });
    const { payload, recipients } = roomManager.createRoom(settings);
    for (const recipient of recipients) {
      const socketId = socketIdMap.get(recipient);
      if (socketId) {
        io.to([socketId]).emit('room:created', { roomPreview: payload });
        logger.emit(recipient, 'room:created', { roomPreview: payload });
      }
    }
  });
}

function setupAskListHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;

  socket.on('room:ask-list', () => {
    logger.on(userId, 'room:ask-list');
    const roomPreviews = roomManager.getRoomPreviews();
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      io.to(socketId).emit('room:send-list', { roomPreviews });
      logger.emit(userId, 'room:send-list', { roomPreviews });
    }
  });
}

function setupRoomSearchHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;

  socket.on('room:search', ({ name }) => {
    logger.on(userId, 'room:search', { name });
    const roomPreviews = roomManager.getRoomPreviews(name);
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      io.to(socketId).emit('room:send-list', { roomPreviews });
      logger.emit(userId, 'room:send-list', { roomPreviews });
    }
  });
}

function setupRoomJoinEvent(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const userId = socket.data.userId;

  socket.on('room:join', ({ roomId }) => {
    logger.on(userId, 'room:join', { roomId });
    const response = roomManager.joinToRoom(userId, roomId);
    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    } else {
      const { payload, player, lobbyRecipients, roomRecipients } = response;
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('room:state', { roomInfo: payload.getRoomInfo() });
        logger.emit(userId, 'room:state', { roomInfo: payload.getRoomInfo() });
      }

      for (const recipient of lobbyRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:update-review', { roomPreview: payload.getRoomPreview() });
          logger.emit(recipient, 'room:update-review', { roomPreview: payload.getRoomPreview() });
        }
      }

      for (const recipient of roomRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:player-joined', { player });
          logger.emit(recipient, 'room:player-joined', { player });
        }
      }
    }
  });
}

function setupRoomLeaveEvent(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  socket.on('room:leave', () => {
    const userId = socket.data.userId;
    logger.on(userId, 'room:leave');
    const response = roomManager.leaveRoom(userId);
    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    } else {
      const { payload, player, lobbyRecipients, roomRecipients } = response;

      const socketId = socketIdMap.get(userId);
      const roomPreviews = roomManager.getRoomPreviews();
      if (socketId && roomPreviews) {
        io.to(socketId).emit('room:send-list', { roomPreviews });
        logger.emit(userId, 'room:send-list', { roomPreviews });
      }

      for (const recipient of lobbyRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:update-review', { roomPreview: payload });
          logger.emit(recipient, 'room:update-review', { roomPreview: payload });
        }
      }

      for (const recipient of roomRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:player-left', { player });
          logger.emit(recipient, 'room:player-left', { player });
        }
      }
    }
  });
}

function setupSendRoomInfoEvent(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const userId = socket.data.userId;

  socket.on('room:ask-room-info', () => {
    logger.on(userId, 'room:ask-room-info');
    const response = roomManager.getRoomInfo(userId);
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      if (response) {
        io.to(socketId).emit('room:state', { roomInfo: response });
        logger.emit(userId, 'room:state', { roomInfo: response });
      } else {
        io.to(socketId).emit('error', { code: 'ROOM_NOT_FOUND' });
        logger.emit(userId, 'error', { code: 'ROOM_NOT_FOUND' });
      }
    }
  });
}
