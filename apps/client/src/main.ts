import 'input.css';
import App from './app/app';

export const app = new App();
if (app.element) {
  document.body.prepend(app.element);
}
