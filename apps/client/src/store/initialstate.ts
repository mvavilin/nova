import type { State } from '@/store/types/state';
import { Language } from '@/types';

export const initialState: State = {
  id: null,
  username: null,
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
};
