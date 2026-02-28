import { BaseComponent } from '@ComponentsAPI';

document.addEventListener('DOMContentLoaded', () => {
  const app = new BaseComponent({ tag: 'div', id: 'app' });
  if (app.element) document.body.append(app.element);
});
