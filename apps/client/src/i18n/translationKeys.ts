export const TranslationKeys = {
  LANGUAGE_BUTTON: 'language-button',

  WELCOME_ABOUT: 'welcome-about',
  WELCOME_LOGIN: 'welcome-login',
  WELCOME_LOBBY: 'welcome-lobby',
  WELCOME_HEADING: 'welcome-heading',
  WELCOME_REGISTRATION: 'welcome-registration',
  WELCOME_DESCRIPTION: 'welcome-description',

  GAME_RULES_TITLE: 'gameRulesTitle',

  GAME_RULES_PREPARATION_TITLE: 'gameRulesPreparationTitle',
  GAME_RULES_PREPARATION_P1: 'gameRulesPreparationP1',
  GAME_RULES_PREPARATION_P2: 'gameRulesPreparationP2',
  GAME_RULES_PREPARATION_P3: 'gameRulesPreparationP3',

  GAME_RULES_CARD_TYPES_TITLE: 'gameRulesCardTypesTitle',
  GAME_RULES_CARD_TYPES_RED: 'gameRulesCardTypesRed',
  GAME_RULES_CARD_TYPES_BLUE: 'gameRulesCardTypesBlue',
  GAME_RULES_CARD_TYPES_CIVIL: 'gameRulesCardTypesCivil',
  GAME_RULES_CARD_TYPES_KILLER: 'gameRulesCardTypesKiller',
  GAME_RULES_CARD_TYPES_DESC: 'gameRulesCardTypesDesc',

  GAME_RULES_TURN_TITLE: 'gameRulesTurnTitle',
  GAME_RULES_TURN_P1: 'gameRulesTurnP1',
  GAME_RULES_TURN_P2: 'gameRulesTurnP2',

  GAME_RULES_AGENT_TITLE: 'gameRulesAgentTitle',
  GAME_RULES_AGENT_P1: 'gameRulesAgentP1',
  GAME_RULES_AGENT_P2: 'gameRulesAgentP2',
  GAME_RULES_AGENT_P3: 'gameRulesAgentP3',

  GAME_RULES_CHECK_TITLE: 'gameRulesCheckTitle',
  GAME_RULES_CHECK_P1: 'gameRulesCheckP1',
  GAME_RULES_CHECK_P2: 'gameRulesCheckP2',
  GAME_RULES_CHECK_P3: 'gameRulesCheckP3',

  GAME_RULES_MISTAKES_TITLE: 'gameRulesMistakesTitle',
  GAME_RULES_MISTAKES_P1: 'gameRulesMistakesP1',
  GAME_RULES_MISTAKES_P2: 'gameRulesMistakesP2',

  GAME_RULES_VICTORY_TITLE: 'gameRulesVictoryTitle',
  GAME_RULES_VICTORY_P1: 'gameRulesVictoryP1',
  GAME_RULES_VICTORY_P2: 'gameRulesVictoryP2',

  GAME_RULES_CLOSE_BTN: 'gameRulesCloseBtn',

  FORM_LABEL_NAME: 'labelName',
  FORM_LABEL_EMAIL: 'labelEmail',
  FORM_LABEL_PASSWORD: 'labelPassword',
  FORM_PLACEHOLDER_NAME: 'placeholderName',
  FORM_PLACEHOLDER_EMAIL: 'placeholderEmail',
  FORM_PLACEHOLDER_PASSWORD: 'placeholderPassword',
  FORM_ERROR_MESSAGE_NAME: 'errorMessageName',
  FORM_ERROR_MESSAGE_EMAIL: 'errorMessageEmail',
  FORM_ERROR_MESSAGE_PASSWORD: 'errorMessagePassword',

  REGISTRATION_TITLE: 'registrationTitle',
  REGISTRATION_SUBMIT_BTN: 'registrationSubmitBtn',

  LOGIN_TITLE: 'loginTitle',
  LOGIN_SUBMIT_BTN: 'loginSubmitBtn',

  ROOM_TITLE: 'RoomTitle',
  ROOM_INFO_TITLE: 'RoomInfoTitle',
  ROOM_INFO_PLAYERS: 'RoomPlayersInfo',
  ROOM_LEAVE_ROOM_BTN: 'RoomLeaveRoomBtn',
  ROOM_RED_TITLE: 'RoomRedTitle',
  ROOM_BLUE_TITLE: 'RoomBlueTitle',
  ROOM_PLAYER: 'RoomPlayer',
  ROOM_ROLE: 'RoomRole',
  ROOM_SPYMASTER: 'RoomSpymaster',
  ROOM_AGENT: 'RoomAgent',
  ROOM_SPYMASTER_BTN: 'RoomSpymasterBtn',
  ROOM_AGENT_BTN: 'RoomAgentBtn',
  ROOM_LEAVE_COMM_BTN: 'RoomLeaveCommBtn',
  ROOM_PLAYERS_CHOOSING: 'RoomPlayersChoosing',
} as const;

export type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];
