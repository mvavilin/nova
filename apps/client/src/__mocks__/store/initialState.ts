import { Language } from '@types';
import type { State } from '@State';

export const initialState: State = {
  id: '27626bdf-f197-4c9d-8dd5-0cd1426f1f71',
  username: 'test',
  email: 'a@a.ab',
  authStatus: true,
  language: Language.RU,
  registration: {
    fields: {
      username: { value: '', isValid: false, isChanged: false },
      email: { value: '', isValid: false, isChanged: false },
      password: { value: '', isValid: false, isChanged: false },
    },
    isFormValid: false,
  },
  login: {
    fields: {
      email: { value: '', isValid: false, isChanged: false },
      password: { value: '', isValid: false, isChanged: false },
    },
    isFormValid: false,
  },
  rooms: [],
  currentRoom: null,

  game: null,
};
