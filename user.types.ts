enum UserStatus {
  OFFLINE = 'offline', // не в сети
  ONLINE = 'online', // в лобби/меню
  IN_ROOM = 'in_room', // в комнате ожидания игры
  IN_GAME_MULTI = 'in_game_multi', // в многопользовательской игре
  IN_GAME_SOLO = 'in_game_solo', // в соло игре с AI
}

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

enum Language {
  RU = 'ru',
  EN = 'en',
}

// полная модель пользователя в БД (только на сервере)
interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  status: UserStatus;
  currentRoomId?: string; // id комнаты, если в игре/ожидании
  stats: UserStats;
  settings: UserSettings;
  createdAt: Date; // дата регистрации
  updatedAt: Date; // дата обновления профиля
}

// статистика игр
interface UserStats {
  gamesPlayed: number;
  wins: number;
}

// настройки интерфейса
interface UserSettings {
  theme: Theme;
  language: Language;
}

// тело запроса регистрации
interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// публичные данные пользователя (для клиента)
interface PublicUser {
  id: string;
  username: string;
  avatarUrl?: string;
  status: UserStatus;
  stats: UserStats;
}
