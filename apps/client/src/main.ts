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
