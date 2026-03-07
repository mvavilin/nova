import type { RegisterDto, User, AuthResult } from '@/types/user.types';
import { baseEndpoints, Endpoints } from './api.types';
import { delay } from './helpers.api';

// 1. Флаг режима
const USE_MOCK = import.meta.env['VITE_USE_MOCK'] === 'true';

// 2. Мок-данные
const MOCK_USER: User = {
  id: 'usr_a1b2c3d4',
  username: 'Alice',
  email: 'alice101@example.com',
  password: 'W!123456',
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
