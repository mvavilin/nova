import { Status } from '@types';
import type { Route } from '@router/router.types';
import type Page from '@ComponentsAPI/layout/PageComponent/PageComponent';
import type App from '@components/App/App';

import { Access } from '@router/router.enums';
import { ROUTES } from '@router/router.constants';
import { PAGES } from '@constants';

import { NotFoundPage } from '@pages';

import clientUserStore from '@store/clientUserStore';

export default class Router {
  private app: App;
  private routes = ROUTES;
  private lastAllowedPath = PAGES.WELCOME.url();

  constructor(app: App) {
    this.app = app;
  }

  public init(): void {
    globalThis.addEventListener('popstate', () => this.render());

    clientUserStore.subscribe(() => {
      // this.render();
    });

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
      this.redirect(this.lastAllowedPath);
      return;
    }

    this.lastAllowedPath = path;
    this.app.setChildren(this.getPage(route, path));
  }

  private checkAccess(route: Route): boolean {
    const clientUser = clientUserStore.getState();

    const accessCheck: Record<Access, () => boolean> = {
      [Access.PUBLIC]: () => true,
      [Access.UNAUTHORIZED]: () => clientUser.status === Status.UNAUTHORIZED,
      [Access.AUTHORIZED]: () =>
        clientUser.status === Status.AUTHORIZED &&
        (!route.allowedSubStatuses || route.allowedSubStatuses.includes(clientUser.subStatus)),
    };

    return accessCheck[route.access]();
  }

  private getPage(route: Route, path: string): Page {
    const match = path.match(route.path);
    const parameters = match?.groups ? { ...match.groups } : {};
    return match ? new route.page(parameters) : new NotFoundPage();
  }

  public redirect(path: string): void {
    if (globalThis.location.pathname === path) return;
    globalThis.history.pushState({}, '', path);
    this.render();
  }
}
