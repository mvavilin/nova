import Page from '@ComponentsAPI/layout/PageComponent/PageComponent';
import HeadingComponent from '@ComponentsAPI/ui/HeadingComponent/HeadingComponent';
import { PAGES } from '@constants';

export class LoginPage extends Page {
  constructor() {
    const { id, label } = PAGES.LOGIN;
    super({ id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class LobbyPage extends Page {
  constructor() {
    const { id, label } = PAGES.LOBBY;
    super({
      id,
      children: [new HeadingComponent({ level: 1, content: label })],
    });
  }
}

export class RoomPage extends Page {
  constructor() {
    const { id, label } = PAGES.ROOM;
    super({ id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class GamePage extends Page {
  constructor() {
    const { id, label } = PAGES.GAME;
    super({ id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class SoloSetupPage extends Page {
  constructor() {
    const { id, label } = PAGES.SOLO_SETUP;
    super({
      id,
      children: [new HeadingComponent({ level: 1, content: label })],
    });
  }
}

export class SoloGamePage extends Page {
  constructor() {
    const { id, label } = PAGES.SOLO_GAME;
    super({ id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class ResultsPage extends Page {
  constructor() {
    const { id, label } = PAGES.RESULTS;
    super({ id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class ProfilePage extends Page {
  constructor() {
    const { id, label } = PAGES.PROFILE;
    super({ id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}

export class NotFoundPage extends Page {
  constructor() {
    const { id, label } = PAGES.NOT_FOUND;
    super({ id, children: [new HeadingComponent({ level: 1, content: label })] });
  }
}
