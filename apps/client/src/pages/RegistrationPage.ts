export function createRegisterForm(): HTMLFormElement {
  const form = document.createElement('form');
  form.className =
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 p-10 bg-sky-200 rounded-sm flex flex-col items-center gap-4 m-0';

  const title = document.createElement('h2');
  title.textContent = 'Sign up';
  title.className = 'text-2xl font-medium';

  const inputName = createInputForm({
    id: 'userName',
    type: 'text',
    placeholder: 'Enter your name...',
    labelText: 'Name',
  });

  const inputEmail = createInputForm({
    id: 'userEmail',
    type: 'email',
    placeholder: 'Enter your email...',
    labelText: 'Email',
  });
  const inputPassword = createInputForm({
    id: 'userPassword',
    type: 'password',
    placeholder: 'Enter your password...',
    labelText: 'Password',
  });

  const button = document.createElement('button');
  button.textContent = 'Submit';
  button.type = 'submit';
  button.className = 'bg-sky-500 w-30 h-8 rounded-md font-medium hover:cursor-pointer';

  form.append(title, inputName, inputEmail, inputPassword, button);
  return form;
}

interface inputType {
  id: string;
  type: string;
  placeholder: string;
  labelText: string;
}

function createInputForm(options: inputType): HTMLDivElement {
  const containerStyles = 'w-full flex flex-col justify-between gap-2';
  const inputStyles = 'p-2 border border-black-300 rounded-md hover:cursor-pointer';
  const labelStyles = 'uppercase ';

  const { id, type, placeholder, labelText } = { ...options };
  const container = document.createElement('div');
  container.className = containerStyles;

  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  input.className = inputStyles;

  const label = document.createElement('label');
  label.textContent = labelText;
  label.setAttribute('for', id);
  label.className = labelStyles;

  const span = document.createElement('span');
  container.append(label, input, span);
  return container;
}
