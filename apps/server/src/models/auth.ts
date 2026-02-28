import z from 'zod';

export const LoginDtoSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export const RegisterDtoSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;
