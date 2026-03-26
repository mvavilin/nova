import { URLS, ROUTES } from '@api/RouterAPI/router.constants';
import { isRouteAccessible } from '@api/RouterAPI/router.utilities';
import type App from '@components/App/App';
import { NotFoundPage } from '@pages';

export default class Router {
  private app: App;
  private routes = ROUTES;
  // chore: remove in production
  // private lastAllowedPath = URLS.LOBBY();
  // private lastAllowedPath = URLS.GAME('27626bdf-f197-4c9d-8dd5-0cd1426f1f71');
  private lastAllowedPath = URLS.WELCOME();

  constructor(app: App) {
    this.app = app;
  }

  public init(): void {
    globalThis.addEventListener('popstate', () => this.render());
    globalThis.addEventListener('load', () => this.render());
    // this.render();
  }

  public render(): void {
    const children = this.app.children;

    for (const child of children)
      if ('destroyPage' in child && typeof child.destroyPage === 'function') {
        child.destroyPage();
      } else {
        child.destroy();
      }
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
    if (globalThis.location.pathname === path) return;

    globalThis.history.pushState({}, '', path);
    this.render();
  }
}
