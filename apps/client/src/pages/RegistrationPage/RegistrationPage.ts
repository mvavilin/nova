import {
  BaseComponent,
  ButtonComponent,
  ContainerComponent,
  FormComponent,
  HeadingComponent,
  InputComponent,
  LabelComponent,
  TextComponent,
} from '@/api/ComponentsAPI';
import {
  sectionStyles,
  formStyles,
  titleStyle,
  containerStyles,
  inputStyles,
  labelStyles,
  buttonStyles,
  spanStyles,
} from './Registration.styles';
import { inputEmailInfo, inputNameInfo, inputPasswordInfo } from '../../constants/input.constants';
import type { inputBlockType } from '@/types/registration.types';
import { checkForm } from '@/utils/validateForm';
import { saveStorageData } from '@/utils/localStorage';
import { register } from '@/api/auth.api';
import { localStorageProps } from '@/constants/localStorage.constants';

const inputFocusedClass = 'focus:border-yellow';
const inputInvalidClass = 'border-red focus:border-red';

export default class RegistrationPage extends BaseComponent {
  private inputArray: InputComponent[] = [];
  private buttonSubmit: ButtonComponent | null = null;

  constructor() {
    super({ tag: 'section', classes: sectionStyles });
    this.render();
  }

  private render(): void {
    const form = new FormComponent({ classes: formStyles });
    const title = new HeadingComponent({ level: 1, classes: titleStyle, content: 'Sign up' });
    const inputNameBlock = this.createInputBlock(inputNameInfo);
    const inputEmailBlock = this.createInputBlock(inputEmailInfo);
    const inputPasswordBlock = this.createInputBlock(inputPasswordInfo);

    this.buttonSubmit = new ButtonComponent({
      classes: buttonStyles,
      content: 'Submit',
      type: 'submit',
    });
    this.buttonSubmit.setAttributes({ disabled: true });
    this.buttonSubmit.setListeners({ click: (event: Event) => this.onSubmit(event) });

    form.appendChildren([
      title,
      inputNameBlock,
      inputEmailBlock,
      inputPasswordBlock,
      this.buttonSubmit,
    ]);

    form.setListeners({ submit: (event: Event) => this.onSubmit(event) });

    this.appendChildren(form);
  }

  private createInputBlock(options: inputBlockType): ContainerComponent {
    const container = new ContainerComponent({ classes: containerStyles });
    const label = new LabelComponent({
      classes: labelStyles,
      content: options.labelText,
      htmlFor: options.id,
    });
    const span = new TextComponent({ tag: 'span', classes: spanStyles });

    const input = new InputComponent({
      id: options.id,
      type: options.type,
      name: options.name,
      placeholder: options.placeholder,
      autocomplete: options.autocomplete,
      classes: inputStyles,
    });

    if (options.minLength && options.maxLength) {
      input.setAttributes({ minLength: options.minLength, maxLength: options.maxLength });
    }
    this.inputArray.push(input);

    input.setListeners({
      input: (event: Event) => {
        event.preventDefault();
        if (!input.isValidByRegex(options.pattern) || !input.isValid()) {
          input.removeClasses(inputFocusedClass);
          input.setClasses(inputInvalidClass);
          span.setContent(options.errorMessage);
          checkForm(this.inputArray, this.buttonSubmit);
        } else {
          input.removeClasses(inputInvalidClass);
          input.setClasses(inputFocusedClass);
          span.clearContent();
          checkForm(this.inputArray, this.buttonSubmit);
        }
      },
    });

    container.appendChildren([label, input, span]);

    return container;
  }

  private async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const [username, email, password] = this.inputArray.map((input) => input.value);
    if (!username || !email || !password) return;

    try {
      const { user, token } = await register({ username, email, password });

      if (user && token) {
        saveStorageData(localStorageProps.token, token);
        saveStorageData(localStorageProps.user, user);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
