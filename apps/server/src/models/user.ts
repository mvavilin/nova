import z from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
