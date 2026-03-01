# StateAPI

`StateAPI` — это простая система управления состоянием для фронтенд-приложений. Она позволяет централизованно хранить состояние, обрабатывать действия через редьюсеры и выполнять побочные эффекты через послеобработчики (afterwares). Подходит для работы с синхронизацией состояния через сервер, веб-сокеты и локальное хранилище.

---

## Основные концепции

### Store

Хранит текущее состояние и уведомляет подписчиков при его изменении.

```ts
const store = new StateAPI({ count: 0 });
store.subscribe((state, action) => {
  console.log('Новое состояние:', state);
});
```

### Action

Объект, описывающий событие, которое меняет состояние.

```ts
type Action = {
  type: string;
  payload?: Record<string, unknown>;
};

const incrementAction: Action = { type: 'INCREMENT', payload: { amount: 1 } };
```

### Reducer

Функция, которая изменяет состояние на основе действия.

```ts
const counterReducer: Reducer<{ count: number }> = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + (action.payload?.amount as number) };
    default:
      return state;
  }
};

store.addReducer(counterReducer);
```

### Afterware

Побочные эффекты после изменения состояния (например, логирование или сохранение в localStorage).

```ts
const loggerAfterware: Afterware<{ count: number }> = ({ prevState, nextState, action }) => {
  console.log('Action:', action.type);
  console.log('Prev:', prevState, 'Next:', nextState);
};

store.addAfterware(loggerAfterware);
```

---

## Примеры использования

### Изменение состояния

```ts
store.dispatch({ type: 'INCREMENT', payload: { amount: 2 } });
```

### Подписка и отписка

```ts
const unsubscribe = store.subscribe((state, action) => {
  console.log('Обновленное состояние:', state);
});

// Чтобы отписаться
unsubscribe();
```

### Синхронизация с сервером (fetch)

```ts
const serverAfterware: Afterware<{ data: any }> = async ({ nextState, action }) => {
  if (action.type === 'FETCH_DATA') {
    const response = await fetch('/api/data');
    const data = await response.json();
    store.dispatch({ type: 'SET_DATA', payload: { data } });
  }
};

store.addAfterware(serverAfterware);
```

### Работа с WebSocket

```ts
const ws = new WebSocket('wss://example.com/socket');

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  store.dispatch({ type: 'SOCKET_MESSAGE', payload: message });
};

const socketAfterware: Afterware<any> = ({ action }) => {
  if (action.type === 'SEND_SOCKET') {
    ws.send(JSON.stringify(action.payload));
  }
};

store.addAfterware(socketAfterware);
```

### Сохранение состояния в localStorage

```ts
const localStorageAfterware: Afterware<any> = ({ nextState }) => {
  localStorage.setItem('appState', JSON.stringify(nextState));
};

store.addAfterware(localStorageAfterware);
```

---

## Итог

`StateAPI` предоставляет простую и мощную архитектуру для управления состоянием, редьюсерами и побочными эффектами, поддерживает серверные запросы, WebSocket и хранение локально. Все действия централизованно обрабатываются через dispatch, а подписчики получают обновленное состояние автоматически.
