import z from 'zod';

export const LoginDtoSchema = z.object({
  email: z.string(),
  userName: z.string(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;
