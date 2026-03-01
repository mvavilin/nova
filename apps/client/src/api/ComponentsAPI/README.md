# Components API

`BaseComponent` - это базовый компонент проекта, он является основой для всех остальных компонентов: кнопки, формы, поля ввода, контейнера, заголовков, текстовых блоков, изображений, ссылок, списков, текстовых областей, селектов, радио и чекбоксов.

> - [x] _Чекбоксы перед методами и свойствами используются для отметки
>       покрытия тестами. Метод или свойство с отмеченным чекбоксом
>       считается протестированным и безопасным для использования._

---

## BaseComponent

Базовый компонент с поддержкой DOM, иерархии, событий, классов, атрибутов, контента и стилей.

- [ ] **Конструктор:** создает компонент с заданными свойствами.

```ts
const app = new BaseComponent({ tag: 'div', content: 'Hello!', classes: 'app-class', id: 'app' });
```

### Свойства и методы:

- [ ] **element** --- свойства доступа к элементу, родителю, детям и содержимому.
- [ ] **parent** --- свойства доступа к элементу, родителю, детям и содержимому.
- [ ] **children** --- свойства доступа к элементу, родителю, детям и содержимому.
- [ ] **root** --- свойства доступа к элементу, родителю, детям и содержимому.
- [ ] **id** --- свойства доступа к элементу, родителю, детям и содержимому.
- [ ] **content** --- свойства доступа к элементу, родителю, детям и содержимому.
- [ ] **setParent** --- управление иерархией компонентов.
- [ ] **findParent** --- управление иерархией компонентов.
- [ ] **findChild** --- управление иерархией компонентов.
- [ ] **detach** --- управление иерархией компонентов.
- [ ] **destroy** --- управление иерархией компонентов.
- [ ] **setClasses** --- управление CSS-классами элемента.
- [ ] **removeClasses** --- управление CSS-классами элемента.
- [ ] **toggleClasses** --- управление CSS-классами элемента.
- [ ] **hasClasses** --- управление CSS-классами элемента.
- [ ] **setAttributes** --- работа с HTML-атрибутами.
- [ ] **removeAttributes** --- работа с HTML-атрибутами.
- [ ] **toggleAttributes** --- работа с HTML-атрибутами.
- [ ] **hasAttribute** --- работа с HTML-атрибутами.
- [ ] **setChildren** --- управление дочерними компонентами.
- [ ] **appendChildren** --- управление дочерними компонентами.
- [ ] **detachChildren** --- управление дочерними компонентами.
- [ ] **destroyChildren** --- управление дочерними компонентами.
- [ ] **setListeners** --- управление событиями и подписками.
- [ ] **removeListeners** --- управление событиями и подписками.
- [ ] **addSubscriptions** --- управление событиями и подписками.
- [ ] **setContent** --- изменение и очистка содержимого.
- [ ] **clearContent** --- изменение и очистка содержимого.
- [ ] **setId** --- установка id и title.
- [ ] **setTitle** --- установка id и title.
- [ ] **setStyle** --- добавление и удаление inline-стилей.
- [ ] **removeStyle** --- добавление и удаление inline-стилей.
- [x] **show** --- управление видимостью элемента.
- [x] **hide** --- управление видимостью элемента.

---

## ButtonComponent

Компонент кнопки, наследует BaseComponent.

### Методы:

- [x] `setType(type: HTMLButtonElement['type']): this` --- задает тип кнопки (button, submit, reset).
- [x] `setDisabled(disabled: boolean): this` --- включает или отключает кнопку.
- [x] `setName(name: string): this` --- устанавливает атрибут name.
- [x] `setValue(value: string): this` --- устанавливает значение value.

**Пример:**

```ts
const submitButton = new ButtonComponent({ content: 'Login', type: 'submit' });
submitButton.setDisabled(false);
```

---

## FormComponent

Компонент формы.

### Методы:

- [ ] `setAction(action: string): this` --- задает URL отправки формы.
- [ ] `setMethod(method: HTMLFormElement['method']): this` --- устанавливает HTTP-метод (get, post).
- [ ] `submit(): void` --- программно отправляет форму.
- [ ] `reset(): void` --- сбрасывает все поля формы.
- [ ] `getFormData(): FormData` --- возвращает данные формы в виде FormData.

**Пример:**

```ts
const form = new FormComponent({ method: 'post', action: '/submit' });
form.submit();
```

---

## InputComponent

Компонент поля ввода.

### Методы:

- [ ] `setValue(value: string): this` --- устанавливает значение поля.
- [ ] `setName(name: string): this` --- задает атрибут name.
- [ ] `setType(type: HTMLInputElement['type']): this` --- задает тип input (text, password и др.).
- [ ] `setPlaceholder(placeholder: string): this` --- устанавливает placeholder.
- [ ] `setDisabled(disabled: boolean): this` --- делает поле неактивным.
- [ ] `setRequired(required: boolean): this` --- делает поле обязательным.
- [ ] `isLengthBetween(min: number, max: number): boolean` --- проверяет длину значения.
- [ ] `isValidByRegex(pattern: RegExp): boolean` --- валидирует значение по регулярному выражению.
- [ ] `isValid(): boolean` --- проверяет встроенную HTML-валидацию.
- [ ] `isEmpty(): boolean` --- проверяет, пустое ли поле.
- [ ] `clear(): this` --- очищает значение.

**Пример:**

```ts
const usernameInput = new InputComponent({ placeholder: 'Username' });
usernameInput.setValue('JohnDoe');
console.log(usernameInput.isValid());
```

---

## ContainerComponent

Компонент контейнера, наследует BaseComponent. Может использовать разные
теги (`div`, `section`, `article`, `main`, и др.).

### Методы:

- [x] `getChildren(): HTMLCollection` --- возвращает DOM-детей контейнера.

**Пример:**

```ts
const container = new ContainerComponent({ tag: 'section' });
container.appendChildren([submitButton, usernameInput]);
console.log(container.getChildren());
```

---

## HeadingComponent

Компонент заголовка (h1--h6), наследует BaseComponent.

### Методы:

- [ ] `setLevel(level: 1 | 2 | 3 | 4 | 5 | 6): this` --- изменяет уровень заголовка.

**Пример:**

```ts
const header = new HeadingComponent({ level: 2, content: 'Section Title' });
header.setLevel(3);
```

---

## TextComponent

Компонент текста с возможностью выбора тега (`p`, `span`, `div`, `h1`--`h6` и др.), наследует BaseComponent.

### Методы:

- [ ] `appendText(text: string | number): this` --- добавляет текст в конец содержимого.
- [ ] `prependText(text: string | number): this` --- добавляет текст в начало.
- [ ] `uppercase(): this` --- переводит текст в верхний регистр.
- [ ] `lowercase(): this` --- переводит текст в нижний регистр.
- [ ] `capitalize(): this` --- делает заглавными первые буквы слов.

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

- [ ] `setSrc(source: string): this` --- устанавливает путь к изображению.
- [ ] `setAlt(alt: string): this` --- задает альтернативный текст.
- [ ] `setDimensions(width?: number | string, height?: number | string): this` --- задает ширину и высоту.

**Пример:**

```ts
const img = new ImageComponent({ source: '/logo.png', alt: 'Logo', width: 100, height: 50 });
img.setSrc('/new-logo.png');
```

---

## LinkComponent

Компонент ссылки, наследует BaseComponent.

### Методы:

- [ ] `setHref(href: string): this` --- устанавливает адрес ссылки.
- [ ] `setTarget(target: HTMLAnchorElement['target']): this` --- задает способ открытия ссылки.
- [ ] `setRel(related: string): this` --- устанавливает атрибут rel.

**Пример:**

```ts
const link = new LinkComponent({ href: '/home', target: '_blank', content: 'Go Home' });
link.setRel('noopener noreferrer');
```

---

## ListComponent

Компонент списка (ul/ol), наследует BaseComponent.

### Методы:

- [ ] `setItems(items: (string | number)[]): this` --- полностью заменяет элементы списка.
- [ ] `addItem(item: string | number): this` --- добавляет новый элемент.
- [ ] `removeItem(index: number): this` --- удаляет элемент по индексу.
- [ ] `clearItems(): this` --- очищает список.

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

- [ ] `getValue(): string` --- возвращает текущее значение.
- [ ] `setValue(value: string): this` --- устанавливает текст.
- [ ] `setPlaceholder(placeholder: string): this` --- задает placeholder.
- [ ] `setRows(rows: number): this` --- устанавливает количество строк.
- [ ] `setCols(cols: number): this` --- устанавливает количество колонок.
- [ ] `clear(): this` --- очищает содержимое.

**Пример:**

```ts
const textarea = new TextareaComponent({ placeholder: 'Write here...', rows: 4, cols: 50 });
textarea.setValue('Hello');
```

---

## SelectComponent

Компонент select, наследует BaseComponent.

### Методы:

- [ ] `setOptions(options: { value: string; label: string; selected?: boolean }[]): this` --- полностью заменяет список опций.
- [ ] `addOption(value: string, label: string, selected?: boolean): this` --- добавляет новую опцию.
- [ ] `removeOption(value: string): this` --- удаляет опцию по значению.
- [ ] `clearOptions(): this` --- очищает все опции.
- [ ] `getValue(): string | string[]` --- возвращает выбранное значение (или массив при multiple).
- [ ] `setValue(value: string | string[]): this` --- устанавливает выбранное значение.
- [ ] `isMultiple(): boolean` --- проверяет, включен ли множественный выбор.
- [ ] `setMultiple(multiple: boolean): this` --- включает или отключает режим multiple.

**Пример:**

```ts
const select = new SelectComponent({ options: [{ value: '1', label: 'One' }] });
select.addOption('2', 'Two');
```

---

## RadioComponent

Компонент радио, наследует InputComponent.

### Методы:

- [ ] `isChecked(): boolean` --- проверяет, выбрана ли радиокнопка.
- [ ] `setChecked(state: boolean): this` --- устанавливает состояние выбора.

**Пример:**

```ts
const radio = new RadioComponent({ checked: true });
radio.setChecked(false);
```

---

## CheckboxComponent

Компонент чекбокса, наследует InputComponent.

### Методы:

- [ ] `isChecked(): boolean` --- проверяет, отмечен ли чекбокс.
- [ ] `setChecked(state: boolean): this` --- устанавливает состояние.
- [ ] `toggle(): this` --- переключает состояние чекбокса.

**Пример:**

```ts
const checkbox = new CheckboxComponent({ checked: false });
checkbox.toggle();
```

---

## LabelComponent

Компонент label, наследует BaseComponent.

### Методы:

- [x] `setFor(): string` --- добавляет атрибут for.

**Пример:**

```ts
const label = new LabelComponent({ htmlFor: 'name' });
checkbox.setFor('surname');
```

---

## Общий пример создания формы

```ts
import {
  FormComponent,
  InputComponent,
  ButtonComponent,
  HeadingComponent,
  TextComponent,
  LinkComponent,
  ListComponent,
  ImageComponent,
  TextareaComponent,
  SelectComponent,
  CheckboxComponent,
} from 'api/ComponentsAPI';

const formContainer = new FormComponent({ method: 'post', action: '/submit' });

const usernameInput = new InputComponent({
  name: 'username',
  placeholder: 'Username',
  required: true,
  autocomplete: 'on',
});
const passwordInput = new InputComponent({
  name: 'password',
  placeholder: 'Password',
  type: 'password',
  required: true,
  autocomplete: 'on',
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
const comments = new TextareaComponent({
  placeholder: 'Comments...',
  rows: 3,
  cols: 40,
  id: 'textarea',
});
const countrySelect = new SelectComponent({
  options: [
    { value: 'us', label: 'USA' },
    { value: 'ca', label: 'Canada' },
  ],
  id: 'select',
});
const newsletter = new CheckboxComponent({ checked: true, id: 'checkbox' });

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

console.log(formContainer);
if (formContainer.element) document.body.append(formContainer.element);

formContainer.setListeners({
  submit: (event) => {
    event.preventDefault();
    const data = formContainer.getFormData();
    console.log(data.get('username'));
    console.log(data.get('password'));
  },
});
```
