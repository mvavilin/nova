import z from 'zod';

export const UserDtoSchema = z.object({
  email: z.string(),
  userName: z.string(),
  password: z.string(),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
