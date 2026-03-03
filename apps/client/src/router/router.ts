import { UserType } from '@types';
import type { Route } from '@router/router.types';
import type Page from '@ComponentsAPI/ui/PageComponent/PageComponent';
import type App from '@components/App/App';

import { Access } from '@router/router.enums';
import { ROUTES, PATHS } from '@router/router.constants';

import { UserState } from '@store/initialState';

import { NotFoundPage } from '@pages';

export default class Router {
  private app: App;
  private routes = ROUTES;
  private lastAllowedPath = PATHS.HOME.url();

  constructor(app: App) {
    this.app = app;
  }

  public init(): void {
    globalThis.addEventListener('popstate', () => this.render());
    this.render();
  }

  private render(): void {
    const path = globalThis.location.pathname;
    const route = this.routes.find((route) => route.path.test(path));

    if (!route) {
      this.app.setChildren(new NotFoundPage());
      return;
    }

    if (!this.checkAccess(route)) {
      this.navigate(this.lastAllowedPath);
      return;
    }

    this.lastAllowedPath = path;
    this.app.setChildren(this.getPage(route, path));
  }

  private checkAccess(route: Route): boolean {
    const { status: userStatus } = UserState;
    const accessCheck: Record<Access, () => boolean> = {
      [Access.PUBLIC]: () => true,
      [Access.UNAUTHORIZED]: () => userStatus.type === UserType.UNAUTHORIZED,
      [Access.AUTHORIZED]: () =>
        userStatus.type === UserType.AUTHORIZED &&
        (!route.allowedSubStatuses || route.allowedSubStatuses.includes(userStatus.subStatus)),
    };

    return accessCheck[route.access]();
  }

  private getPage(route: Route, path: string): Page {
    const match = path.match(route.path);
    const parameters = match?.groups ? { ...match.groups } : {};
    return match ? new route.page(parameters) : new NotFoundPage();
  }

  public navigate(path: string): void {
    if (globalThis.location.pathname === path) return;
    globalThis.history.pushState({}, '', path);
    this.render();
  }
}
