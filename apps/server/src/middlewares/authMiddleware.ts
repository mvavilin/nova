import type { ExtendedError, Socket } from 'socket.io';
import * as z from 'zod';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ServerConstants } from '@repo/shared/src/api.constants.ts';
import { prisma } from '../prisma/prisma.ts';

export const authMiddleware = async (
  socket: Socket,
  next: (error?: ExtendedError | undefined) => void
): Promise<void> => {
  try {
    const token: unknown =
      socket.handshake.auth?.auth_token || socket.handshake.headers?.auth_token;
    const auth_token = z.string().parse(token);

    const secretKey = process.env.JWT_SECRET_KEY || ServerConstants.DEFAULT_JWT_SECRET_KEY;
    const payload = jwt.verify(auth_token, secretKey);

    const userId = typeof payload === 'string' ? '' : payload.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('No found');

    socket.data.userId = userId;
    next();
  } catch {
    console.error('Authentication error');
    next(new Error('AUTH_REQUIRED'));
  }
};
