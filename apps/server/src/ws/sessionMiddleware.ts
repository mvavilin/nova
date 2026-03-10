import type { ExtendedError, Socket } from 'socket.io';
import type { SessionRecord, SocketData } from '../types/types.ts';
import { v4 as uuid } from 'uuid';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../packages/shared/src/socketEvents.ts';

const sessions = new Map<string, SessionRecord>();

export const sessionMiddleware = async (
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  next: (error?: ExtendedError | undefined) => void
): Promise<void> => {
  try {
    const token: unknown =
      socket.handshake.auth?.session_token || socket.handshake.headers?.session_token;

    if (typeof token === 'string') {
      const record = sessions.get(token);

      if (record) {
        if (record.userId !== socket.data.userId) {
          return next(new Error('SESSION_USER_MISMATCH'));
        }

        record.currentSocketId = socket.id;
        sessions.set(token, record);
        socket.data.sessionToken = token;
        socket.data.isReconnect = true;

        return next();
      }
    }

    const sessionToken = uuid();
    sessions.set(sessionToken, {
      sessionToken,
      userId: socket.data.userId,
      currentSocketId: socket.id,
    });

    socket.data.sessionToken = sessionToken;
    socket.data.isReconnect = false;

    next();
  } catch {
    console.error('Authentication error');
    next(new Error('SESSION_USER_MISMATCH'));
  }
};
