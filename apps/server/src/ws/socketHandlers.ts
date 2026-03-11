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

  socket.on('room:search', ({ name }) => {
    const { payload } = roomManager.getRoomPreviews(name);
    const idSet = socketIdMap.get(userId);
    if (idSet) {
      io.to([...idSet]).emit('room:send-list', { roomPreviews: payload });
    }
  });

  setupRoomJoinEvent(io, socket, roomManager);
  setupRoomLeaveEvent(io, socket, roomManager);
}

function setupRoomJoinEvent(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  roomManager: RoomManager
): void {
  const userId = socket.data.userId;

  socket.on('room:join', ({ roomId }) => {
    const response = roomManager.joinToRoom(userId, roomId);
    if ('error' in response) {
      const idSet = socketIdMap.get(userId);
      if (idSet) {
        io.to([...idSet]).emit('error', { code: response.error });
      }
    } else {
      const { payload, player, lobbyRecipients, roomRecipients } = response;
      const idSet = socketIdMap.get(userId);
      if (idSet) {
        io.to([...idSet]).emit('room:state', { roomInfo: payload.getRoomInfo() });
      }

      for (const recipient of lobbyRecipients) {
        const idSet = socketIdMap.get(recipient);
        if (idSet) {
          io.to([...idSet]).emit('room:update-review', { roomPreview: payload.getRoomPreview() });
        }
      }

      for (const recipient of roomRecipients) {
        const idSet = socketIdMap.get(recipient);
        if (idSet) {
          io.to([...idSet]).emit('room:player-joined', { player });
        }
      }
    }
  });
}

function setupRoomLeaveEvent(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  roomManager: RoomManager
): void {
  socket.on('room:leave', () => {
    roomLeaveHandler(io, socket, roomManager);
  });
}

export function roomLeaveHandler(io: Server, socket: Socket, roomManager: RoomManager): void {
  const userId = socket.data.userId;
  const response = roomManager.leaveRoom(userId);
  if ('error' in response) {
    const idSet = socketIdMap.get(userId);
    if (idSet) {
      io.to([...idSet]).emit('error', { code: response.error });
    }
  } else {
    const { payload, player, lobbyRecipients, roomRecipients } = response;

    for (const recipient of lobbyRecipients) {
      const idSet = socketIdMap.get(recipient);
      if (idSet) {
        io.to([...idSet]).emit('room:update-review', { roomPreview: payload });
      }
    }

    for (const recipient of roomRecipients) {
      const idSet = socketIdMap.get(recipient);
      if (idSet) {
        io.to([...idSet]).emit('room:player-left', { player });
      }
    }
  }
}
