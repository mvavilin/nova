import store from '@store';
import { BaseComponent, TextComponent } from '@ComponentsAPI';
import { LobbyActions } from '@/store/actions/lobby.actions';
import { Avatar } from '@/components';

const PROFILE_SECTION_CLASSES = `flex items-center gap-5 justify-end cursor-pointer`;
const USER_NAME_CLASSES = `text-xl font-bold`;

type ProfileSectionProperties = {
  name: string | null;
  id: string | null;
};

const DEFAULT_PROFILE_NAME = 'Пользователь';

export default class ProfileSection extends BaseComponent {
  private nameComponent: TextComponent;
  private avatar: Avatar;
  private unsubscribe: () => void;

  constructor({ name, id }: ProfileSectionProperties) {
    super({ tag: 'section', classes: PROFILE_SECTION_CLASSES });

    this.nameComponent = new TextComponent({
      content: name || DEFAULT_PROFILE_NAME,
      classes: USER_NAME_CLASSES,
    });
    this.avatar = new Avatar({ seed: id });

    this.appendChildren([this.avatar, this.nameComponent]);

    this.unsubscribe = store.subscribe(this.handleStoreUpdate);

    this.setListeners({
      click: () => store.dispatch({ type: LobbyActions.GO_TO_PROFILE_PAGE }),
    });
  }

  private handleStoreUpdate = (): void => {
    const stateName = store.getState().username;
    this.setName(stateName);
  };

  public setName(name: string | null): void {
    const newName = name || DEFAULT_PROFILE_NAME;
    this.nameComponent.setContent(newName);
  }

  public override destroy(): this {
    this.unsubscribe();
    return this;
  }
}
