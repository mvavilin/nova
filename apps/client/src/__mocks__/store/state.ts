import { type State } from '@/store/types/state.types';
import { Language } from '@types';

const mockInitialState: State = {
  id: null,
  username: null,
  email: null,
  password: null,
  authStatus: false,
  avatarUrl: null,
  language: Language.RU,
  registration: { fields: {}, isFormValid: false },
  login: { fields: {}, isFormValid: false },
  profile: { fields: {}, isFormValid: false },
};

export default mockInitialState;
