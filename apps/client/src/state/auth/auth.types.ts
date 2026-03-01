import type { UserStatus } from '@types';

export type Listener = (status: UserStatus) => void;

export enum AuthStatus {
  UNAUTHORIZED = 'UNAUTHORIZED',
  AUTHORIZED = 'AUTHORIZED',
}
