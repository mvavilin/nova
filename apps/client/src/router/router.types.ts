import BaseComponent from '@ComponentsAPI/base/BaseComponent';

import { AuthorizedSubStatus } from '@types';
import { Access } from '@router/router.enums';

export interface Route {
  path: RegExp;
  page: new (parameters: Record<string, string>) => BaseComponent;
  access: Access;
  allowedSubStatuses?: AuthorizedSubStatus[];
}
