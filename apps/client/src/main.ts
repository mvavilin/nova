import App from './components/App/App';

const app = new App();
app.hide(false);

if (app.element) document.body.append(app.element);

window.addEventListener('load', () => {
  app.show();
});

// ===== StateAPI Tests =====

// import { StateAPI, counterReducer } from './api/StateAPI';

// const state = { count: 0 };

// const api = new StateAPI(state);

// api.addReducer(counterReducer);

// api.subscribe(() => {
//   console.log('State changed:', api.getState());
// });

// api.dispatch({ type: 'INCREMENT' });
// api.dispatch({ type: 'INCREMENT' });
// api.dispatch({ type: 'DECREMENT' });
