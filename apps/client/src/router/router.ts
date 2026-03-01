import { UserType } from '@types';
import { type Route } from '@router/router.types';
import { Access } from '@router/router.enums';
import { ROUTES, PATHS } from '@router/router.constants';
import { authState } from '@state';
import { NotFoundPage } from '@pages';
import { type BaseComponent } from '@ComponentsAPI';
import type Page from '@ComponentsAPI/ui/PageComponent/PageComponent';

export default class Router {
  private container: BaseComponent;
  private routes: Route[];
  private currentPath = globalThis.location.pathname;
  private lastAllowedPath = PATHS.HOME.url();

  constructor(container: BaseComponent) {
    this.container = container;
    this.routes = ROUTES;
    authState.subscribe(() => this.render());
  }

  public init(): void {
    globalThis.addEventListener('popstate', () => {
      this.currentPath = globalThis.location.pathname;
      this.render();
    });

    this.currentPath = globalThis.location.pathname;
    this.render();
  }

  private render(): void {
    if (!this.checkAccess(this.currentPath)) {
      this.navigate(this.lastAllowedPath);
      return;
    }

    this.lastAllowedPath = this.currentPath;

    const page = this.getPageForPath(this.currentPath);
    this.container.setChildren(page);
  }

  private getPageForPath(pathname: string): Page {
    const route = this.routes.find((route) => route.path.test(pathname));
    if (!route) return new NotFoundPage();

    const match = pathname.match(route.path);
    if (!match) return new NotFoundPage();

    const parameters = Object.fromEntries(Object.entries(match.groups || {}));

    return new route.page(parameters);
  }

  private checkAccess(pathname: string): boolean {
    const route = this.routes.find((route) => route.path.test(pathname));
    if (!route) return false;

    const { userStatus: user } = authState;

    if (route.access === Access.PUBLIC) return true;

    if (route.access === Access.UNAUTHORIZED) {
      return user.type === UserType.UNAUTHORIZED;
    }

    if (route.access === Access.AUTHORIZED) {
      return (
        user.type === UserType.AUTHORIZED &&
        (!route.allowedSubStatuses || route.allowedSubStatuses.includes(user.subStatus))
      );
    }

    return false;
  }

  public navigate(path: string): void {
    if (this.currentPath === path) return;

    globalThis.history.pushState({}, '', path);
    this.currentPath = path;
    this.render();
  }
}
