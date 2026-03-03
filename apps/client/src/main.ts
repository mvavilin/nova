import '@/index.css';
import App from '@components/App/App';
import Router from '@router/router';

const app = new App();
if (app.element) document.body.append(app.element);

const router = new Router(app);
router.init();

app.hide(false);
window.addEventListener('load', () => {
  app.show(true, 500);
});
