import type { User } from '../models/user.ts';

export function getUserWithoutPassword(user: User): Omit<User, 'password'> {
  const { id, email, username } = user;

  return { id, email, username };
}
