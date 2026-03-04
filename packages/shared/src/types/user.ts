import * as z from 'zod';
import type { UserSchema } from '../schemas/user';

export type User = z.infer<typeof UserSchema>;
