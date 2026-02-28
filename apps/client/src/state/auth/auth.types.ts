import type { UserStatus } from '@types';

export type Listener = (status: UserStatus) => void;
