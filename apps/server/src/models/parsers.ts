import type { UserDto } from './user.js';

export function parserUserDto(value: unknown): UserDto | null {
  if (typeof value === 'object' && value) {
    const object = value;
    if (
      'login' in object &&
      typeof object.login === 'string' &&
      'password' in object &&
      typeof object.password === 'string' &&
      'email' in object &&
      typeof object.email === 'string'
    ) {
      return { login: object.login, password: object.password, email: object.email };
    }
  }

  return null;
}
