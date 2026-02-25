import type { UserDto } from './user.js';

export function parserUserDto(value: unknown): UserDto | null {
  if (typeof value === 'object' && value) {
    const object = value;
    if (
      'login' in object &&
      typeof object.login === 'string' &&
      'password' in object &&
      typeof object.password === 'string'
    ) {
      return { login: object.login, password: object.password };
    }
  }

  return null;
}
