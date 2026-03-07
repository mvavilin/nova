import { type ClientUser, AuthStatus, SubStatus, Language, Theme } from '@types';

export const mockClientUser: ClientUser = {
  id: '',
  username: '',
  email: '',
  password: '',
  avatarUrl: '',
  authStatus: AuthStatus.UNAUTHORIZED,
  subStatus: null,
  context: {},
  language: Language.RU,
  theme: Theme.LIGHT,
};

export const mockAuthClientUser: ClientUser = {
  id: '67890',
  username: 'maria_sidorova',
  email: 'maria.sidorova@example.com',
  password: 'S3cur3P@ss!',
  avatarUrl: 'https://example.com/avatars/maria.png',
  authStatus: AuthStatus.AUTHORIZED,
  subStatus: SubStatus.IN_ROOM,
  context: { roomCode: 'ABCD1234' },
  language: Language.RU,
  theme: Theme.LIGHT,
};
