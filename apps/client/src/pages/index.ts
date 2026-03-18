import BaseComponent from '@ComponentsAPI/base/BaseComponent';

export { default as RegistrationPage } from '@pages/RegistrationPage/RegistrationPage';
export { default as WelcomePage } from '@pages/WelcomePage/WelcomePage';
export { default as LobbyPage } from '@pages/LobbyPage/LobbyPage';
export { default as RoomPage } from '@pages/RoomPage/RoomPage';

// export class RoomPage extends BaseComponent {
//   constructor() {
//     super();
//     console.log('RoomPage');
//   }
// }

export class NotFoundPage extends BaseComponent {
  constructor() {
    super();
    console.log('NotFoundPage');
  }
}
