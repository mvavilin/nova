import type { ExtendedError, Socket } from 'socket.io';
import * as z from 'zod';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ServerConstants } from '../../../../packages/shared/src/api.constants.ts';
import { prisma } from '../prisma/prisma.ts';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../packages/shared/src/socketEvents.ts';
import type { SocketData } from '../types/types.ts';

export const authMiddleware = async (
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  next: (error?: ExtendedError | undefined) => void
): Promise<void> => {
  try {
    const token: unknown =
      socket.handshake.auth?.auth_token || socket.handshake.headers?.auth_token;
    const authToken = z.string().parse(token);

    const secretKey = process.env.JWT_SECRET_KEY || ServerConstants.DEFAULT_JWT_SECRET_KEY;
    const payload = jwt.verify(authToken, secretKey);

    const userId = typeof payload === 'string' ? '' : payload.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('No found');

    socket.data.userId = userId;
    socket.data.username = user.username;
    next();
  } catch {
    console.error('Authentication error');
    next(new Error('AUTH_REQUIRED'));
  }
};
