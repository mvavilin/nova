import { BaseComponent } from '@ComponentsAPI';

export { default as RegistrationPage } from '@pages/RegistrationPage/RegistrationPage';
export { default as WelcomePage } from '@pages/WelcomePage/WelcomePage';
export { default as LobbyPage } from '@pages/LobbyPage/LobbyPage';
export { default as GamePage } from '@pages/GamePage/GamePage';
export { default as NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
export { default as ProfilePage } from '@pages/ProfilePage/ProfilePage';

export class RoomPage extends BaseComponent {
  constructor() {
    super();
    console.log('RoomPage');
  }
}
