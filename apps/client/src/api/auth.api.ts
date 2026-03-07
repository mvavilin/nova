import type { RegisterDto, ClientUser, AuthResult } from '@types';
import { AuthStatus, SubStatus, Language, Theme } from '@types';
import { baseEndpoints, Endpoints } from './api.types';
import { delay } from './helpers.api';

// 1. Флаг режима
const USE_MOCK = import.meta.env['VITE_USE_MOCK'] === 'true';

// 2. Мок-данные
const MOCK_USER: ClientUser = {
  id: '12345',
  username: 'ivan_petrov',
  email: 'ivan.petrov@example.com',
  password: 'P@ssw0rd!',
  avatarUrl: 'https://example.com/avatars/ivan.png',
  authStatus: AuthStatus.AUTHORIZED,
  subStatus: SubStatus.IN_LOBBY,
  context: {},
  language: Language.RU,
  theme: Theme.DARK,
};
const MOCK_TOKEN = '123456789';

// 3. Публичная функция регистрации
export async function register(userData: RegisterDto): Promise<AuthResult> {
  // Mock implementation
  if (USE_MOCK) {
    await delay(500);
    return { user: MOCK_USER, token: MOCK_TOKEN };
  }

  // Real implementation
  const response = await fetch(`${baseEndpoints.DEPLOY_BASE}${Endpoints.REGISTRATION}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Failed to post user data: ${response.status}`);
  }

  const token = response.headers.get('auth_token');
  const user = await response.json();
  return { user, token };
}

//login logout register
