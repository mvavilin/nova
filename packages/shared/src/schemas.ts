import z from 'zod';

export const LoginDtoSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const RegisterDtoSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

export const WSHandshakeAuthSchema = z.object({
  auth_token: z.string(),
  session_token: z.optional(z.string()),
});
