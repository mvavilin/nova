import { AuthStatus } from '@state/auth/auth.types';

export enum Access {
  PUBLIC = 'PUBLIC',
  UNAUTHORIZED = AuthStatus.UNAUTHORIZED,
  AUTHORIZED = AuthStatus.AUTHORIZED,
}
