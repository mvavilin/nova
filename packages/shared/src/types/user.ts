import * as z from 'zod';
import type { UserSchema } from '../schemas/user.ts';

export type User = z.infer<typeof UserSchema>;
