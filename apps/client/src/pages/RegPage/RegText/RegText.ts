import { TextComponent } from '@/api/ComponentsAPI';
import type { RegTextProperties } from './RegText.types';
import store from '@/store/clientUserStore';
import type { Actions } from '@/store/types/action.types';
import type { ClientUser } from '@types';
import { RegistrationActions } from '@/store/actions/registration.actions';

export default class RegText extends TextComponent {
  constructor({ ...rest }: RegTextProperties = {}) {
    super({
      id: 'reg-text',
      classes: `text-base leading-relaxed text-gray-900`,
      ...rest,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.changeText(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent('Lorem Ipsum Fetch Text');
  }

  private changeText(_state: ClientUser, action: Actions): void {
    if (action.type === RegistrationActions.FETCH_SUCCESS) {
      const fetchedText = action.payload.title;
      this.setContent(fetchedText);
    }
  }
}
