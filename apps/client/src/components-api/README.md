# Components API

Это документация по компонентам на базе `BaseComponent`. Этот базовый компонент является основой для всех остальных компонентов: кнопки, формы, поля ввода, контейнера, заголовков и текстовых блоков.

---

## BaseComponent

Базовый компонент с поддержкой DOM, иерархии, событий, классов, атрибутов, контента и стилей.

### Методы и примеры

- **Конструктор:** создает компонент с заданными свойствами.

```ts
const button = new BaseComponent({ tag: 'button', content: 'Click me', classes: 'btn-primary' });
```

- **element, parent, children, root, id, content** — свойства доступа к элементу, родителю, детям и содержимому.
- **setParent, findParent, findChild, detach, destroy** — управление иерархией.
- **setClasses, removeClasses, toggleClasses, hasClasses** — управление CSS классами.
- **setAttributes, removeAttributes, toggleAttributes, hasAttribute** — управление атрибутами.
- **setChildren, appendChildren, detachChildren, destroyChildren** — работа с дочерними компонентами.
- **setListeners, removeListeners, addSubscriptions** — события.
- **setContent, clearContent** — управление содержимым.
- **setId, setTitle** — id и title.
- **setStyle, removeStyle** — стили.
- **show, hide** — управление видимостью.

---

## ButtonComponent

Компонент кнопки, наследует BaseComponent.

### Методы:

- `setType(type: HTMLButtonElement['type']): this` — задает тип кнопки (button, submit, reset).
- `setDisabled(disabled: boolean): this` — делает кнопку неактивной.
- `setName(name: string): this` — задает name.
- `setValue(value: string): this` — задает value.

**Пример:**

```ts
const submitButton = new ButtonComponent({ content: 'Submit', type: 'submit' });
submitButton.setDisabled(false);
```

---

## FormComponent

Компонент формы.

### Методы:

- `setAction(action: string): this` — задает action формы.
- `setMethod(method: HTMLFormElement['method']): this` — задает метод (get, post).
- `submit(): void` — отправка формы.
- `reset(): void` — сброс формы.
- `getFormData(): FormData` — получение данных формы.

**Пример:**

```ts
const form = new FormComponent({ method: 'post', action: '/submit' });
form.submit();
```

---

## InputComponent

Компонент поля ввода.

### Методы:

- `setValue(value: string): this` — задает значение.
- `setName(name: string): this` — задает name.
- `setType(type: HTMLInputElement['type']): this` — задает тип input.
- `setPlaceholder(placeholder: string): this` — задает placeholder.
- `setDisabled(disabled: boolean): this` — отключение input.
- `setRequired(required: boolean): this` — обязательное поле.
- `isLengthBetween(min: number, max: number): boolean` — проверка длины.
- `isValidByRegex(pattern: RegExp): boolean` — проверка по регулярке.
- `isValid(): boolean` — проверка встроенной валидации.
- `isEmpty(): boolean` — проверка на пустоту.
- `clear(): this` — очистка значения.

**Пример:**

```ts
const usernameInput = new InputComponent({ placeholder: 'Username' });
usernameInput.setValue('JohnDoe');
console.log(usernameInput.isValid());
```

---

## ContainerComponent

Компонент контейнера, наследует BaseComponent.

### Методы:

- `getChildren(): HTMLCollection` — получает DOM-детей контейнера.

**Пример:**

```ts
const container = new ContainerComponent();
container.appendChildren([submitButton, usernameInput]);
console.log(container.getChildren());
```

---

## HeadingComponent

Компонент заголовка (h1–h6), наследует BaseComponent.

### Методы:

- `setLevel(level: 1 | 2 | 3 | 4 | 5 | 6): this` — меняет уровень заголовка.

**Пример:**

```ts
const header = new HeadingComponent({ level: 2, content: 'Section Title' });
header.setLevel(3);
```

---

## TextComponent

Компонент текста, наследует BaseComponent.

### Методы:

- `appendText(text: string | number): this` — добавляет текст в конец.
- `prependText(text: string | number): this` — добавляет текст в начало.
- `uppercase(): this` — делает текст заглавными буквами.
- `lowercase(): this` — делает текст строчными буквами.
- `capitalize(): this` — делает заглавными первые буквы слов.

**Пример:**

```ts
const paragraph = new TextComponent({ content: 'hello world' });
paragraph.capitalize().appendText('!');
console.log(paragraph.content); // 'Hello World!'
```

---

## Общий пример создания формы

```ts
// Создание контейнера формы
const formContainer = new FormComponent({ method: 'post', action: '/submit' });

// Поля ввода
const usernameInput = new InputComponent({
  name: 'username',
  placeholder: 'Username',
  required: true,
});
const passwordInput = new InputComponent({
  name: 'password',
  placeholder: 'Password',
  type: 'password',
  required: true,
});

// Кнопка
const submitButton = new ButtonComponent({ content: 'Login', type: 'submit' });

// Заголовок и текст
const title = new HeadingComponent({ level: 1, content: 'Login Form' });
const description = new TextComponent({ content: 'Please enter your credentials:' });

// Добавляем элементы в форму
formContainer.appendChildren([title, description, usernameInput, passwordInput, submitButton]);

// Обработчик отправки
formContainer.setListeners({
  submit: (e) => {
    e.preventDefault();
    console.log(formContainer.getFormData());
  },
});
```
