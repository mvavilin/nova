export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
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

export interface AuthResult {
  user: User;
  token: string | null;
}
