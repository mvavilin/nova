export interface LoginDto {
  login: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  avatarUrl?: string;
  preferredLanguage?: 'ru' | 'en';
  theme?: 'light' | 'dark';
}
