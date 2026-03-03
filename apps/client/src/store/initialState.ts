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
