import express, { type Request, type Response } from 'express';
import { createServer } from 'node:http';
import { userRouter } from './api/users.js';
import { errorHandler } from './middlewares/errorHandler.ts';
import { Endpoints } from './models/api.types.ts';

const app = express();
const server = createServer(app);

app.use(express.json());

app.get(Endpoints.BASE, (_req: Request, res: Response) => {
  res.send('Hello world');
});

app.use(Endpoints.USERS, userRouter);

app.use(errorHandler);

export default server;
