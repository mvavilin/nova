import { URLS, ROUTES } from '@api/RouterAPI/router.constants';
import { isRouteAccessible } from '@api/RouterAPI/router.utilities';
import type App from '@components/App/App';
import { NotFoundPage } from '@pages';

export default class Router {
  private app: App;
  private routes = ROUTES;
  private lastAllowedPath = URLS.WELCOME();
  constructor(app: App) {
    this.app = app;
  }

  public init(path: string = this.lastAllowedPath): void {
    globalThis.addEventListener('popstate', () => this.render());
    this.navigate(path);
  }

  private render(): void {
    const children = this.app.children;
    for (const child of children) child.destroy();

    const path = globalThis.location.pathname;
    const route = this.routes.find((route) => route.path.test(path));

    if (!route) {
      this.app.setChildren(new NotFoundPage());
      return;
    }

    if (!isRouteAccessible(route.access)) {
      this.navigate(this.lastAllowedPath);
      return;
    }

    this.lastAllowedPath = path;

    this.app.setChildren(new route.page());
  }

  public navigate(path: string = URLS.WELCOME()): void {
    globalThis.history.pushState({}, '', path);
    this.render();
  }
}
