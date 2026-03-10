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
import { sessionMiddleware } from './ws/sessionMiddleware.ts';
import { RoomManager } from './rooms/roomManager.ts';
import { setupSocketHandlers } from './ws/socketHandlers.ts';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../packages/shared/src/socketEvents.ts';
import type { SocketData } from './types/types.ts';

export const socketIdMap = new Map<string, Set<string>>();

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
io.use(sessionMiddleware);

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>) => {
    const { userId, username } = socket.data;
    if (socket.data.isReconnect) {
      console.log('reconnect', socket.data.sessionToken);
      socket.emit('session:token', { sessionToken: socket.data.sessionToken });
    } else {
      console.log('connect', socket.data.sessionToken);
      socket.emit('session:token', { sessionToken: socket.data.sessionToken });
      roomManager.addPlayerToLobby(userId, username);
    }
    if (!socketIdMap.has(userId)) {
      socketIdMap.set(userId, new Set());
    }
    socketIdMap.get(userId)?.add(socket.id);

    socket.on('disconnect', () => {
      const idSet = socketIdMap.get(userId);
      if (idSet) {
        idSet.delete(socket.id);
      }
      console.log(`disconnect ${socket.data.sessionToken}`);
    });

    setupSocketHandlers(io, socket, roomManager);
  }
);

export default server;
