import type { FormState } from '@components/BaseForm/BaseForm.types';
import { Language, type RoomPreview } from '@types';
import type { RoomInfo } from '@shared/types/room';

export type State = {
  id: string | null;
  username: string | null;
  email: string | null;
  authStatus: boolean;
  language: Language;
  registration: FormState;
  login: FormState;
  profile: FormState;
  rooms: RoomPreview[];
  currentRoom: RoomInfo | null;
};
