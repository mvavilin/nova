# Components API

Это документация по компонентам на базе `BaseComponent`. Этот базовый компонент является основой для всех остальных компонентов: кнопки, формы, поля ввода, контейнера, заголовков, текстовых блоков, изображений, ссылок, списков, текстовых областей, селектов, радио и чекбоксов.

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

- `setType(type: HTMLButtonElement['type']): this`
- `setDisabled(disabled: boolean): this`
- `setName(name: string): this`
- `setValue(value: string): this`

**Пример:**

```ts
const submitButton = new ButtonComponent({ content: 'Submit', type: 'submit' });
submitButton.setDisabled(false);
```

---

## FormComponent

Компонент формы.

### Методы:

- `setAction(action: string): this`
- `setMethod(method: HTMLFormElement['method']): this`
- `submit(): void`
- `reset(): void`
- `getFormData(): FormData`

**Пример:**

```ts
const form = new FormComponent({ method: 'post', action: '/submit' });
form.submit();
```

---

## InputComponent

Компонент поля ввода.

### Методы:

- `setValue(value: string): this`
- `setName(name: string): this`
- `setType(type: HTMLInputElement['type']): this`
- `setPlaceholder(placeholder: string): this`
- `setDisabled(disabled: boolean): this`
- `setRequired(required: boolean): this`
- `isLengthBetween(min: number, max: number): boolean`
- `isValidByRegex(pattern: RegExp): boolean`
- `isValid(): boolean`
- `isEmpty(): boolean`
- `clear(): this`

**Пример:**

```ts
const usernameInput = new InputComponent({ placeholder: 'Username' });
usernameInput.setValue('JohnDoe');
console.log(usernameInput.isValid());
```

---

## ContainerComponent

Компонент контейнера, наследует BaseComponent. Может использовать разные теги (`div`, `section`, `article`, `main`, и др.).

### Методы:

- `getChildren(): HTMLCollection`

**Пример:**

```ts
const container = new ContainerComponent({ tag: 'section' });
container.appendChildren([submitButton, usernameInput]);
console.log(container.getChildren());
```

---

## HeadingComponent

Компонент заголовка (h1–h6), наследует BaseComponent.

### Методы:

- `setLevel(level: 1 | 2 | 3 | 4 | 5 | 6): this`

**Пример:**

```ts
const header = new HeadingComponent({ level: 2, content: 'Section Title' });
header.setLevel(3);
```

---

## TextComponent

Компонент текста с возможностью выбора тега (`p`, `span`, `div`, `h1`–`h6` и др.), наследует BaseComponent.

### Методы:

- `appendText(text: string | number): this`
- `prependText(text: string | number): this`
- `uppercase(): this`
- `lowercase(): this`
- `capitalize(): this`

**Пример:**

```ts
const paragraph = new TextComponent({ tag: 'p', content: 'hello world' });
paragraph.capitalize().appendText('!');
console.log(paragraph.content); // 'Hello World!'
```

---

## ImageComponent

Компонент изображения, наследует BaseComponent.

### Методы:

- `setSrc(source: string): this`
- `setAlt(alt: string): this`
- `setDimensions(width?: number | string, height?: number | string): this`

**Пример:**

```ts
const img = new ImageComponent({ source: '/logo.png', alt: 'Logo', width: 100, height: 50 });
img.setSrc('/new-logo.png');
```

---

## LinkComponent

Компонент ссылки, наследует BaseComponent.

### Методы:

- `setHref(href: string): this`
- `setTarget(target: HTMLAnchorElement['target']): this`
- `setRel(related: string): this`

**Пример:**

```ts
const link = new LinkComponent({ href: '/home', target: '_blank', content: 'Go Home' });
link.setRel('noopener noreferrer');
```

---

## ListComponent

Компонент списка (ul/ol), наследует BaseComponent.

### Методы:

- `setItems(items: (string | number)[]): this`
- `addItem(item: string | number): this`
- `removeItem(index: number): this`
- `clearItems(): this`

**Пример:**

```ts
const list = new ListComponent({ type: 'ul', items: ['Item 1', 'Item 2'] });
list.addItem('Item 3');
list.removeItem(0);
```

---

## TextareaComponent

Компонент текстовой области, наследует BaseComponent.

### Методы:

- `getValue(): string`
- `setValue(value: string): this`
- `setPlaceholder(placeholder: string): this`
- `setRows(rows: number): this`
- `setCols(cols: number): this`
- `clear(): this`

**Пример:**

```ts
const textarea = new TextareaComponent({ placeholder: 'Write here...', rows: 4, cols: 50 });
textarea.setValue('Hello');
```

---

## SelectComponent

Компонент select, наследует BaseComponent.

### Методы:

- `setOptions(options: { value: string; label: string; selected?: boolean }[]): this`
- `addOption(value: string, label: string, selected?: boolean): this`
- `removeOption(value: string): this`
- `clearOptions(): this`
- `getValue(): string | string[]`
- `setValue(value: string | string[]): this`
- `isMultiple(): boolean`
- `setMultiple(multiple: boolean): this`

**Пример:**

```ts
const select = new SelectComponent({ options: [{ value: '1', label: 'One' }] });
select.addOption('2', 'Two');
```

---

## RadioComponent

Компонент радио, наследует InputComponent.

### Методы:

- `isChecked(): boolean`
- `setChecked(state: boolean): this`

**Пример:**

```ts
const radio = new RadioComponent({ checked: true });
radio.setChecked(false);
```

---

## CheckboxComponent

Компонент чекбокса, наследует InputComponent.

### Методы:

- `isChecked(): boolean`
- `setChecked(state: boolean): this`
- `toggle(): this`

**Пример:**

```ts
const checkbox = new CheckboxComponent({ checked: false });
checkbox.toggle();
```

---

## Общий пример создания формы

```ts
const formContainer = new FormComponent({ method: 'post', action: '/submit' });

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
const submitButton = new ButtonComponent({ content: 'Login', type: 'submit' });
const title = new HeadingComponent({ level: 1, content: 'Login Form' });
const description = new TextComponent({ content: 'Please enter your credentials:' });
const logo = new ImageComponent({ source: '/logo.png', alt: 'Logo', width: 100, height: 50 });
const forgotLink = new LinkComponent({
  href: '/forgot',
  content: 'Forgot password?',
  target: '_blank',
});
const features = new ListComponent({ type: 'ul', items: ['Feature 1', 'Feature 2'] });
const comments = new TextareaComponent({ placeholder: 'Comments...', rows: 3, cols: 40 });
const countrySelect = new SelectComponent({
  options: [
    { value: 'us', label: 'USA' },
    { value: 'ca', label: 'Canada' },
  ],
});
const newsletter = new CheckboxComponent({ checked: true });

formContainer.appendChildren([
  logo,
  title,
  description,
  usernameInput,
  passwordInput,
  comments,
  countrySelect,
  newsletter,
  submitButton,
  forgotLink,
  features,
]);

formContainer.setListeners({
  submit: (e) => {
    e.preventDefault();
    console.log(formContainer.getFormData());
  },
});
```
