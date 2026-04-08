import { TextComponent } from '@ComponentsAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

const LOGO_CLASSES = `font-brand font-normal text-2xl leading-none tracking-[0.01rem] text-transparent [-webkit-text-stroke:1px_var(--color-brand)] text-center sm:text-left cursor-pointer`;

export default class Logo extends TextComponent {
  constructor() {
    super({
      classes: LOGO_CLASSES,
      content: 'Nova Codenames Game',
      listeners: {
        click: () => {
          store.dispatch({ type: AppActionTypes.GO_TO_WELCOME_PAGE });
        },
      },
    });
  }
}
