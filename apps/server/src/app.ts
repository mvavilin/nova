import express, { type Request, type Response } from 'express';
import { createServer } from 'node:http';
import { userRouter } from './api/users.js';
import { errorHandler } from './middlewares/errorHandler.ts';
import { Endpoints, ServerConstants } from '../../../packages/shared/src/api.constants.ts';
import { authRouter } from './api/auth.ts';
import cors from 'cors';
import 'dotenv/config';
import { Server } from 'socket.io';
import { authMiddleware } from './middlewares/authMiddleware.ts';
import { sessionMiddleware } from './middlewares/sessionMiddleware.ts';

const FRONTEND_URL = process.env.FRONTEND_URL || ServerConstants.DEFAULT_FRONTEND_URL;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

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

io.on('connection', (socket) => {
  if (socket.data.isReconnect) {
    console.log('reconnect', socket.data.sessionToken);
    socket.emit('session:token', { sessionToken: socket.data.sessionToken });
  } else {
    setTimeout(() => {
      console.log('connect', socket.data.sessionToken);
      socket.emit('session:token', { sessionToken: socket.data.sessionToken });
    });
  }
});

export default server;
