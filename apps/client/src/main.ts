import 'index.css';
import App from '@components/App/App';
import Router from '@api/RouterAPI/router';

const app = new App();
if (app.element) document.body.append(app.element);

const router = new Router(app);
router.init();

app.hide(false);

window.addEventListener('load', () => app.show(true, 500));

export { app, router };
