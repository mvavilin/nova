import * as z from 'zod';
import type { LoginDtoSchema, RegisterDtoSchema, WSHandshakeAuthSchema } from '../schemas/auth.ts';

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export type WSHandshakeAuth = z.infer<typeof WSHandshakeAuthSchema>;
