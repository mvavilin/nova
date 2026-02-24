import express, { Router, type Request, type Response } from 'express';
import { createServer } from 'node:http';
import { userRouter } from './api/users.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const server = createServer(app);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.use('/api/users', userRouter);

app.use(errorHandler);

export default server;
