import { BaseComponent } from '@ComponentsAPI';
// import Router from '@router/router';

document.addEventListener('DOMContentLoaded', () => {
  const app = new BaseComponent({ tag: 'div', id: 'app' });

  if (app.element) document.body.append(app.element);

  // if (app.id) {
  //   const router = new Router(app.id);
  //   router.init();
  // }
});
