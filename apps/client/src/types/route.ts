import Page from '@ComponentsAPI/ui/PageComponent/PageComponent';
import { AuthorizedSubStatus } from '@types';

export enum Access {
  PUBLIC = 'PUBLIC',
  AUTHORIZED = 'AUTHORIZED',
}

export interface Route {
  path: RegExp;
  page: new (parameters?: Record<string, string>) => Page;
  access: Access;
  allowedSubStatuses?: AuthorizedSubStatus[];
}
