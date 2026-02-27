import {
  BaseComponent,
  ButtonComponent,
  ContainerComponent,
  FormComponent,
  HeadingComponent,
  InputComponent,
  TextComponent,
} from '@/api/ComponentsAPI';
import { inputEmailInfo, inputNameInfo, inputPasswordInfo } from '../../constants/input.constants';
import type { inputBlockType } from '@/types/registration.types';

// const sectionStyles =
//   'relative w-screen h-screen bg-[url("src/assets/bg-sky.png")] bg-center bg-cover bg-no-repeat';

const sectionStyles = [
  'relative',
  'w-screen',
  'h-screen',
  'bg-[url("src/assets/bg-sky.png")]',
  'bg-center',
  'bg-cover',
  'bg-no-repeat',
];
const formStyles = [
  'fixed',
  'top-1/2',
  'left-1/2',
  '-translate-x-1/2',
  '-translate-y-1/2',
  'w-100',
  'p-15',
  'bg-gray/85',
  'rounded-xl',
  'flex',
  'flex-col',
  'justify-center',
  'items-center',
  'gap-6',
  'm-0',
];
const titleStyle = ['text-3xl', 'font-bold', 'text-yellow', 'font-brand'];
const containerStyles = ['w-full', 'flex', 'flex-col', 'self-center', 'gap-2'];
const inputStyles = [
  'p-2',
  'bg-white/40',
  'border',
  'border-solid',
  'border-black',
  'rounded-md',
  'hover:cursor-pointer',
  'hover:transition-colors',
  'hover:duration-300',
  'focus:border-yellow',
  'outline-none',
];
const labelStyles = ['uppercase', 'font-medium'];
const buttonStyles = [
  'bg-gray-blue',
  'w-36',
  'h-9',
  'rounded-md',
  'font-medium',
  'hover:cursor-pointer',
  'hover:bg-soothig-green',
  'hover:transition-colors',
  'hover:duration-300',
];
const spanStyles = ['text-red'];

export default class RegistrationPage extends BaseComponent {
  constructor() {
    super({ tag: 'section', classes: sectionStyles });
    this.render();
  }

  private render(): void {
    const form = new FormComponent({ classes: formStyles });
    const title = new HeadingComponent({ level: 1, classes: titleStyle, content: 'Sign up' });
    const inputName = this.createInputContainer(inputNameInfo);
    const inputEmail = this.createInputContainer(inputEmailInfo);
    const inputPassword = this.createInputContainer(inputPasswordInfo);

    const buttonSubmit = new ButtonComponent({
      classes: buttonStyles,
      content: 'Submit',
      type: 'submit',
    });
    form.appendChildren([title, inputName, inputEmail, inputPassword, buttonSubmit]);
    this.appendChildren(form);
  }

  private createInputContainer(options: inputBlockType): ContainerComponent {
    const { id, type, name, placeholder, autocomplete, minLength, maxLength, labelText } = {
      ...options,
    };
    const container = new ContainerComponent({ classes: containerStyles });
    const input = new InputComponent({
      id,
      type,
      name,
      placeholder,
      autocomplete,
      classes: inputStyles,
    });
    if (minLength && maxLength) {
      input.setAttributes({ minLength, maxLength });
    }

    const label = new BaseComponent({ tag: 'label', classes: labelStyles, content: labelText });
    label.setAttributes({ for: id });
    const span = new TextComponent({ tag: 'span', content: 'Error', classes: spanStyles });
    if (container instanceof ContainerComponent) {
      container.appendChildren([label, input, span]);
    }
    return container;
  }
}
