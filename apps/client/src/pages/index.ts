import Page from '@ComponentsAPI/ui/PageComponent/PageComponent';
import HeadingComponent from '@ComponentsAPI/ui/HeadingComponent/HeadingComponent';
import ButtonComponent from '@ComponentsAPI/ui/ButtonComponent/ButtonComponent';
import { PAGES_CONFIG } from '@constants';

import { router } from '@/main';
import { PATHS } from '@router/router.constants';

export class WelcomePage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.WELCOME_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class LoginPage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.LOGIN_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class RegisterPage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.REGISTER_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class LobbyPage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.LOBBY_PAGE;
    super({
      pageId: id,
      children: [
        new HeadingComponent({ level: 1, content: label }),
        new ButtonComponent({
          listeners: {
            click: (): void => router.navigate(PATHS.LOGIN.url()),
          },
        }),
      ],
    });
  }
}

export class RoomPage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.ROOM_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class GamePage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.GAME_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class SoloSetupPage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.SOLO_SETUP_PAGE;
    super({
      pageId: id,
      children: [new HeadingComponent({ level: 1, content: label })],
    });
  }
}

export class SoloGamePage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.SOLO_GAME_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class ResultsPage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.RESULTS_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class ProfilePage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.PROFILE_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class NotFoundPage extends Page {
  constructor() {
    const { id, label } = PAGES_CONFIG.NOT_FOUND_PAGE;
    super({ pageId: id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}
