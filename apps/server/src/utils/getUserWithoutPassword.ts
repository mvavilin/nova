import type { User } from '../../../../packages/shared/src/types/user.ts';

export function getUserWithoutPassword(user: User): Omit<User, 'password'> {
  const { id, email, username } = user;

  return { id, email, username };
}
