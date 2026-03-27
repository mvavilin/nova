import type { Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../packages/shared/src/socketEvents.ts';
import { type SocketData } from '../../types/types.ts';
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
  setupChooseTeam(socket);
}

function setupCreateRoomHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;
  socket.on('room:create', ({ settings }) => {
    const response = roomManager.createRoom(userId, settings);

    if (!('error' in response)) {
      logger.on(userId, 'room:create', { settings });
      const { roomPreview, roomInfo, lobbyRecipients } = response;

      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('room:state', { roomInfo });
        logger.emit(userId, 'room:state', { roomInfo });
      }

      for (const recipient of lobbyRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to([socketId]).emit('room:created', { roomPreview });
          logger.emit(recipient, 'room:created', { roomPreview });
        }
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
      const { roomInfo, roomPreview, lobbyRecipients, roomRecipients } = response;
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('room:state', { roomInfo });
        logger.emit(userId, 'room:state', { roomInfo });
      }

      for (const recipient of lobbyRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:update-review', { roomPreview });
          logger.emit(recipient, 'room:update-review', { roomPreview });
        }
      }

      for (const recipient of roomRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:player-joined', { roomInfo });
          logger.emit(recipient, 'room:player-joined', { roomInfo });
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
      const { roomPreviews, roomPreview, roomInfo, lobbyRecipients, roomRecipients } = response;

      const socketId = socketIdMap.get(userId);
      if (socketId && roomPreviews) {
        io.to(socketId).emit('room:send-list', { roomPreviews });
        logger.emit(userId, 'room:send-list', { roomPreviews });
      }

      for (const recipient of lobbyRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:update-review', { roomPreview });
          logger.emit(recipient, 'room:update-review', { roomPreview });
        }
      }

      for (const recipient of roomRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:player-left', { roomInfo });
          logger.emit(recipient, 'room:player-left', { roomInfo });
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

function setupChooseTeam(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const userId = socket.data.userId;

  socket.on('team:change', ({ player }) => {
    logger.on(userId, 'team:change', { player });
    if (userId !== player.id) return;
    const response = roomManager.chooseTeam(player);
    if ('room' in response) {
      const { room, recipients } = response;
      for (const recipient of recipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          const roomInfo = room.getRoomInfo();
          io.to(socketId).emit('team:changed', { roomInfo });
          logger.emit(recipient, 'team:changed', { roomInfo });
        }
      }
      if (room.isCompletedTeams()) {
        sendGameStartTimer(recipients);
      }
    } else {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    }
  });
}

function sendGameStartTimer(recipients: string[]): void {
  for (const recipient of recipients) {
    const socketId = socketIdMap.get(recipient);
    if (socketId) {
      io.to(socketId).emit('game:start-timer');
      logger.emit(recipient, 'game:start-timer');
    }
  }
}
