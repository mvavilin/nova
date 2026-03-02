import z from 'zod';
import type {
  LoginDtoSchema,
  RegisterDtoSchema,
  UserSchema,
  WSHandshakeAuthSchema,
} from './schemas';

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export type User = z.infer<typeof UserSchema>;

export type WSHandshakeAuth = z.infer<typeof WSHandshakeAuthSchema>;
