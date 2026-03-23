import express, { type Request, type Response } from 'express';
import { createServer } from 'node:http';
import { userRouter } from './api/users.js';
import { errorHandler } from './api/errorHandler.ts';
import { Endpoints, ServerConstants } from '../../../packages/shared/src/api.constants.ts';
import { authRouter } from './api/auth.ts';
import cors from 'cors';
import 'dotenv/config';
import { Server } from 'socket.io';
import { authMiddleware } from './ws/authMiddleware.ts';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../packages/shared/src/socketEvents.ts';
import { setupConnection } from './ws/socketHandlers/sessionHandlers.ts';
import { sessionMiddleware } from './ws/sessionMiddleware.ts';

const FRONTEND_URL = process.env.FRONTEND_URL || ServerConstants.DEFAULT_FRONTEND_URL;
const FRONTEND_URL_BACKUP = process.env.FRONTEND_URL_BACKUP;
const originForCors = [FRONTEND_URL];
if (typeof FRONTEND_URL_BACKUP === 'string' && FRONTEND_URL_BACKUP !== FRONTEND_URL)
  originForCors.push(FRONTEND_URL_BACKUP);

const app = express();
const server = createServer(app);
export const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: originForCors,
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: originForCors,
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

setupConnection();

export default server;
