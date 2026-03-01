import Page from '@ComponentsAPI/ui/PageComponent/PageComponent';
import { AuthorizedSubStatus } from '@types';
import { Access } from '@router/router.enums';

export interface Route {
  path: RegExp;
  page: new (parameters: Record<string, string>) => Page;
  access: Access;
  allowedSubStatuses?: AuthorizedSubStatus[];
}
