import type BaseComponent from '@ComponentsAPI/base/BaseComponent';

export enum Access {
  PUBLIC = 'PUBLIC',
  UNAUTHORIZED = 'UNAUTHORIZED',
  AUTHORIZED = 'AUTHORIZED',
}

export interface Route {
  path: RegExp;
  page: new () => BaseComponent;
  access: Access;
}
