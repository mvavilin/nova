import { type ClientUser, AuthStatus, Language, Theme } from '@types';

export const ClientUserState: ClientUser = {
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
