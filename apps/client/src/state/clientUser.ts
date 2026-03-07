import { type ClientUser, Status, Language, Theme } from '@types';

export const ClientUserState: ClientUser = {
  id: '',
  username: '',
  email: '',
  password: '',
  avatarUrl: '',
  status: Status.UNAUTHORIZED,
  subStatus: null,
  context: {},
  language: Language.RU,
  theme: Theme.LIGHT,
  registration: { fields: {}, isFormValid: false },
  login: { fields: {}, isFormValid: false },
  profile: { fields: {}, isFormValid: false },
};

// TODO: тестовые данные, удалить в продакшене

// import { SubStatus } from '@types';

// export const UserState: ClientUser = {
//   id: '12345',
//   username: 'ivan_petrov',
//   email: 'ivan.petrov@example.com',
//   password: 'P@ssw0rd!',
//   avatarUrl: 'https://example.com/avatars/ivan.png',
//   status: Status.AUTHORIZED,
//   subStatus: SubStatus.IN_LOBBY,
//   context: {},
//   language: Language.RU,
//   theme: Theme.DARK,
// registration: { fields: {}, isFormValid: false },
// login: { fields: {}, isFormValid: false },
// profile: { fields: {}, isFormValid: false },
// };

// export const UserState: ClientUser = {
//   id: '67890',
//   username: 'maria_sidorova',
//   email: 'maria.sidorova@example.com',
//   password: 'S3cur3P@ss!',
//   avatarUrl: 'https://example.com/avatars/maria.png',
//   status: Status.AUTHORIZED,
//   subStatus: SubStatus.IN_ROOM,
//   context: { roomCode: 'ABCD1234' },
//   language: Language.RU,
//   theme: Theme.LIGHT,
// registration: { fields: {}, isFormValid: false },
// login: { fields: {}, isFormValid: false },
// profile: { fields: {}, isFormValid: false },
// };
