import { AuthStatus } from '@types';

export enum Access {
  PUBLIC = 'PUBLIC',
  UNAUTHORIZED = AuthStatus.UNAUTHORIZED,
  AUTHORIZED = AuthStatus.AUTHORIZED,
}
