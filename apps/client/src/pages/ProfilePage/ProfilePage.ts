import type { ProfilePageProperties } from './ProfilePage.types';
import { LOBBY_PAGE_BACKGROUND } from '@/assets/backgrounds';

import { ContainerComponent, HeadingComponent } from '@ComponentsAPI';
import ProfileGrid from './ProfileGrid/ProfileGrid';
import ProfileHero from './ProfileHero/ProfileHero';
import { Header } from '@/components';
import { UserMenu } from '../LobbyPage/components';
import { TITLE_CLASSES } from '@/constants/styles';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import store from '@/store/store';
import type { State } from '@/store/types';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions/app.actions';

export default class ProfilePage extends ContainerComponent {
  constructor({ ...rest }: ProfilePageProperties = {}) {
    super({
      id: 'profile-page',
      classes: `flex flex-col items-center gap-5 min-h-screen w-full py-[20px] px-[80px] bg-cover bg-center font-text`,
      ...rest,
    });

    this.setStyle({ backgroundImage: `url(${LOBBY_PAGE_BACKGROUND})` });

    this.render();
  }

  private render(): void {
    this.setChildren([this.createHeader(), new ProfileHero(), new ProfileGrid()]);
  }

  private createHeader(): Header {
    return new Header({
      id: 'profile-header',
      children: [this.createHeading(), new UserMenu()],
    });
  }

  private createHeading(): HeadingComponent {
    const heading = new HeadingComponent({
      level: 1,
      content: t(TranslationKeys.PROFILE_TITLE),
      classes: TITLE_CLASSES,
    });

    heading.addSubscriptions([store.subscribe((state, action) => switchLanguage(state, action))]);

    function switchLanguage(_state: State, action: Action): void {
      if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
        heading.setContent(t(TranslationKeys.PROFILE_TITLE));
      }
    }

    return heading;
  }
}
