import express, { type Request, type Response } from 'express';
import { createServer } from 'node:http';
import { userRouter } from './api/users.js';
import { errorHandler } from './api/errorHandler.ts';
import { Endpoints, ServerConstants } from '../../../packages/shared/src/api.constants.ts';
import { authRouter } from './api/auth.ts';
import cors from 'cors';
import 'dotenv/config';
import { Server, Socket } from 'socket.io';
import { authMiddleware } from './ws/authMiddleware.ts';
import { RoomManager } from './rooms/roomManager.ts';
import { setupSocketHandlers } from './ws/socketHandlers.ts';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../packages/shared/src/socketEvents.ts';
import type { SocketData } from './types/types.ts';

export const socketIdMap = new Map<string, string>();

const FRONTEND_URL = process.env.FRONTEND_URL || ServerConstants.DEFAULT_FRONTEND_URL;

const app = express();
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});
const roomManager = new RoomManager();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get(Endpoints.BASE, (_req: Request, res: Response) => {
  res.send('Hello world');
});

app.use(Endpoints.USERS, userRouter);
app.use('', authRouter);

app.use(errorHandler);

io.use(authMiddleware);
// io.use(sessionMiddleware);

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>) => {
    const { userId, username } = socket.data;

    const userSocketCount = [...io.sockets.sockets].filter(
      (s) => s[1].data.userId === userId
    ).length;
    if (userSocketCount > 1) {
      socket.emit('error', { code: 'ALREADY_ONLINE' });
      socket.disconnect();
    } else {
      const status = roomManager.getStatus(userId);
      if (status) {
        const { userStatus, player, recipients } = status;
        socket.emit('session:reconnect', { userStatus });
        for (const recipient of recipients) {
          const socketId = socketIdMap.get(recipient);
          if (socketId) {
            io.to(socketId).emit('session:player-reconnect', { player });
          }
        }
      } else {
        socket.emit('session:connect');
        roomManager.addPlayerToLobby({ userId, username });
      }
    }

    socketIdMap.set(userId, socket.id);

    socket.on('disconnect', () => {
      socketIdMap.delete(userId);
    });

    setupSocketHandlers(io, socket, roomManager);
  }
);

export default server;
