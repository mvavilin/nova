import type { State } from './types/state.types';

const initialState: State = {
  id: '0',
  username: 'noname',
  email: 'test@email.com',
  password: '******',
  avatar: 'url',
  status: 'logged',
  page: 'welcome',
  count: 1,
  title: '',
};

export default initialState;

// suggestion
import type { User } from '@store/types/state.types';
import { UserType } from '@types';
// import { AuthorizedSubStatus } from '@types';
import { PAGES_CONFIG } from '@constants';

// Примеры трех стейтов

export const UserState: User = {
  id: '0',
  username: 'noname',
  email: 'test@email.com',
  password: '******',
  avatar: 'url',
  status: { type: UserType.UNAUTHORIZED },
  page: PAGES_CONFIG.WELCOME_PAGE.id,
  title: PAGES_CONFIG.WELCOME_PAGE.label,
  count: 1,
};

// export const UserState: User = {
//   id: '0',
//   username: 'noname',
//   email: 'test@email.com',
//   password: '******',
//   avatar: 'url',
//   status: {
//     type: UserType.AUTHORIZED,
//     subStatus: AuthorizedSubStatus.IN_LOBBY,
//     context: {},
//   },
//   page: PAGES_CONFIG.LOBBY_PAGE.id,
//   title: PAGES_CONFIG.LOBBY_PAGE.label,
//   count: 5,
// };

// export const UserState: User = {
//   id: '0',
//   username: 'noname',
//   email: 'test@email.com',
//   password: '******',
//   avatar: 'url',
//   status: {
//     type: UserType.AUTHORIZED,
//     subStatus: AuthorizedSubStatus.IN_ROOM,
//     context: { roomCode: 'ABCD1234' },
//   },
//   page: PAGES_CONFIG.GAME_PAGE.id,
//   title: PAGES_CONFIG.GAME_PAGE.label,
//   count: 10,
// };
