import express, { type Request, type Response } from 'express';
import { createServer } from 'node:http';
import { userRouter } from './api/users.js';
import { errorHandler } from './middlewares/errorHandler.ts';
import { Endpoints, ServerConstants } from './models/api.types.ts';
import { authRouter } from './api/auth.ts';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const server = createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || ServerConstants.DEFAULT_FRONTEND_URL;
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
app.use(Endpoints.AUTH, authRouter);

app.use(errorHandler);

export default server;
