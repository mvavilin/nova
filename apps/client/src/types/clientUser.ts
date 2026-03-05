import { type User } from '@repo/shared/src/types';
import { type ClientUserStatus } from '@types';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  token: string | null;
}

export enum Language {
  RU = 'ru',
  EN = 'en',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ClientUser extends User {
  avatarUrl: string;
  status: ClientUserStatus;
  language: Language;
  theme: Theme;
}
