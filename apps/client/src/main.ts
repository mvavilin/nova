import App from './components/App/App';
import './index.css';

const app = new App();
app.hide(false);

if (app.element) document.body.append(app.element);

window.addEventListener('load', () => {
  app.show(true, 1000);
});
