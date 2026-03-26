import { expect, test } from 'vitest';
import type { User } from '../../../../packages/shared/src/types/user.ts';
import { v4 as uuid } from 'uuid';
import { getUserWithoutPassword } from './getUserWithoutPassword.ts';

test('The getUserWithoutPassword function should return the received User object without a password', () => {
  const id = uuid();
  const email = 'mock@mail.com';
  const username = 'username';
  const password = 'password';

  const user: User = { id, email, username, password };

  const output = getUserWithoutPassword(user);

  expect(output).toHaveProperty('id', id);
  expect(output).toHaveProperty('username', username);
  expect(output).toHaveProperty('email', email);
  expect(output).not.toHaveProperty('password');
});
