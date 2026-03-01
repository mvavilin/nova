import { BaseComponent } from '@ComponentsAPI';

export const app = new BaseComponent({ tag: 'div', id: 'app' });

document.addEventListener('DOMContentLoaded', () => {
  if (app.element) document.body.append(app.element);
});
