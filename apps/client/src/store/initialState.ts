import { mockCurrentRoom } from '@/pages/RoomPage/roomMockData';
import type { State } from '@State';
import { Language } from '@types';

export const initialState: State = {
  id: '666',
  username: 'Rino',
  email: null,
  authStatus: false,
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
  profile: { fields: {}, isFormValid: false },
  rooms: [],
  currentRoom: mockCurrentRoom,
};
