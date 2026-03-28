import { LogMessageKeys } from '@repo/shared/src/types/logMessage';

export const TranslationKeys = {
  LANGUAGE_BUTTON: 'language-button',
  WELCOME_RULES: 'welcome-rules',
  WELCOME_ABOUT: 'welcome-about',
  WELCOME_LOGIN: 'welcome-login',
  WELCOME_LOBBY: 'welcome-lobby',
  WELCOME_HEADING: 'welcome-heading',
  WELCOME_REGISTRATION: 'welcome-registration',
  WELCOME_DESCRIPTION: 'welcome-description',

  ABOUT_US_TITLE: 'aboutUsTitle',

  ABOUT_US_INTRO_P1: 'aboutUsIntro1',
  ABOUT_US_INTRO_P2: 'aboutUsIntro2',

  ABOUT_US_HIGHLIGHTS_TITLE: 'aboutUsHighLightsTitle',
  ABOUT_US_HIGHLIGHTS_LIST: 'aboutUsHighLightsList',
  ABOUT_US_MIKHAIL_TITLE: 'aboutUsMikhailTitle',
  ABOUT_US_MIKHAIL_LIST: 'aboutUsMikhailList',
  ABOUT_US_SERGEY_TITLE: 'aboutUsSergeyTitle',
  ABOUT_US_SERGEY_LIST: 'aboutUsSergeyList',
  ABOUT_US_ELENA_TITLE: 'aboutUsElenaTitle',
  ABOUT_US_ELENA_LIST: 'aboutUsElenaList',
  ABOUT_US_ANDREY_TITLE: 'aboutUsAndreyTitle',
  ABOUT_US_ANDREY_LIST: 'aboutUsAndreyList',

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
  ROOM_LEAVE_TEAM_BTN: 'RoomLeaveTeamBtn',
  ROOM_PLAYERS_CHOOSING: 'RoomPlayersChoosing',
  ROOM_TIMER_MESSAGE: 'RoomTimerMessage',

  LOBBY_TITLE: 'lobbyTitle',

  JOIN_ROOM_SECTION_TITLE: 'joinRoomSectionTitle',
  CREATE_ROOM_SECTION_TITLE: 'createRoomSectionTitle',
  PUBLIC_ROOMS_SECTION_TITLE: 'publicRoomsSectionTitle',

  PLAYER_COUNT_FIELD_TITLE: 'playerCountFieldTitle',

  ROOM_NAME_FIELD_TITLE: 'roomNameFieldTitle',
  ROOM_NAME_FIELD_PLACEHOLDER: 'roomNameFieldPlaceholder',
  ROOM_NAME_FIELD_CREATE_BUTTON_LABEL: 'roomNameFieldCreateButtonLabel',

  JOIN_ROOM_FIELD_TITLE: 'joinRoomFieldTitle',
  JOIN_ROOM_FIELD_PLACEHOLDER: 'joinRoomFieldPlaceholder',
  JOIN_ROOM_FIELD_JOIN_BUTTON_LABEL: 'joinRoomFieldJoinButtonLabel',

  SEARCH_ROOM_FIELD_TITLE: 'searchRoomFieldTitle',
  SEARCH_ROOM_FIELD_PLACEHOLDER: 'searchRoomFieldPlaceholder',
  SEARCH_ROOM_FIELD_FIND_BUTTON_LABEL: 'searchRoomFieldFindButtonLabel',

  ROOMS_TABLE_HEADER_TITLES_ROOM: 'roomsTableHeaderRoom',
  ROOMS_TABLE_HEADER_TITLES_PLAYERS: 'roomsTableHeaderPlayers',
  ROOMS_TABLE_HEADER_TITLES_STATUS: 'roomsTableHeaderStatus',

  ROOM_ROW_STATUS_WAITING: 'roomRowStatusWaiting',
  ROOM_ROW_STATUS_PLAYING: 'roomRowStatusPlaying',
  ROOM_ROW_STATUS_FINISHING: 'roomRowStatusFinishing',
  ROOM_ROW_JOIN_BUTTON: 'roomRowJoinButton',

  GAME_TITLE: 'gameTitle',

  RED_TURN: 'redTurn',
  BLUE_TURN: 'blueTurn',

  RED_TEAM: 'redTeam',
  BLUE_TEAM: 'blueTeam',

  CHAT_LOG_TITLE: 'chatLogTitle',
  CHAT_INPUT_PLACEHOLDER: 'chatInputPlaceholder',

  [LogMessageKeys.LOG_START_GAME]: 'logStartGame',
  [LogMessageKeys.LOG_HINT_RED]: 'logHintRed',
  [LogMessageKeys.LOG_HINT_BLUE]: 'logHintBlue',
  [LogMessageKeys.LOG_VOTE_STARTED]: 'logVoteStarted',
  [LogMessageKeys.LOG_VOTE_ENDED]: 'logVoteEnded',
  [LogMessageKeys.LOG_OWN_CARD_CHOSEN_RED]: 'logOwnCardChosenRed',
  [LogMessageKeys.LOG_OWN_CARD_CHOSEN_BLUE]: 'logOwnCardChosenBlue',
  [LogMessageKeys.LOG_OTHER_CARD_CHOSEN_RED]: 'logOtherCardChosenRed',
  [LogMessageKeys.LOG_OTHER_CARD_CHOSEN_BLUE]: 'logOtherCardChosenBlue',
  [LogMessageKeys.LOG_CHECKING_ANSWER_RED]: 'logCheckingAnswerRed',
  [LogMessageKeys.LOG_CHECKING_ANSWER_BLUE]: 'logCheckingAnswerBlue',
  [LogMessageKeys.LOG_ANSWER_COUNTED_RED]: 'logAnswerCountedRed',
  [LogMessageKeys.LOG_ANSWER_COUNTED_BLUE]: 'logAnswerCountedBlue',
  [LogMessageKeys.LOG_SCORE_POINT]: 'logScorePoint',

  UNDO_LABEL: 'undoLabel',

  KNOWLEDGE_CHECK_TITLE: 'knowledgeCheckTitle',
  QUESTION_TOPIC: 'questionTopic',
  ENTER_ANSWER: 'enterAnswer',
  ANSWER_EMPTY_WARNING: 'answerEmptyWarning',
  SEND_BUTTON: 'sendButton',

  ANSWER_RATING_TITLE: 'answerRatingTitle',
  OPPONENT_ANSWER: 'opponentAnswer',
  POSSIBLE_ANSWER: 'possibleAnswer',
  PASS_BUTTON: 'passButton',
  FAIL_BUTTON: 'failButton',

  GAME_RESULTS_TITLE: 'gameResultsTitle',
  WINNING_TEAM_PREFIX: 'winningTeamPrefix',
  WINNING_TEAM_SUFFIX: 'winningTeamSuffix',
  TEAM_RED: 'teamRed',
  TEAM_BLUE: 'teamBlue',
  GAME_STATS_TITLE: 'gameStatsTitle',
  SCORE_LABEL: 'scoreLabel',
  TIME_LABEL: 'timeLabel',
  PLAYER_COLUMN: 'playerColumn',
  ROLE_COLUMN: 'roleColumn',
  QUESTIONS_COLUMN: 'questionsColumn',
  CORRECT_ANSWERS_COLUMN: 'correctAnswersColumn',
  RED_TEAM_TITLE: 'redTeamTitle',
  BLUE_TEAM_TITLE: 'blueTeamTitle',
  LOBBY_BUTTON: 'lobbyButton',
  ROOM_BUTTON: 'roomButton',
  ROLE_SPYMASTER: 'roleSpymaster',
  ROLE_OPERATIVE: 'roleOperative',

  FORM_EMPTY_FIELD_WARNING: 'formEmptyFieldWarning',

  PROFILE_TITLE: 'profileTitle',
  PROFILE_USER_LANGUAGE: 'profileUserLanguage',
  PROFILE_USER_ONLINE: 'profileUserOnline',
  PROFILE_USER_LEVEL: 'profileUserLevel',
  PROFILE_USER_WINRATE: 'profileUserWinrate',
  PROFILE_USER_CORRECT: 'profileUserCorrect',
  PROFILE_STATS_TITLE: 'profileStatsTitle',
  PROFILE_STATS_GAMES: 'profileStatsGames',
  PROFILE_STATS_WINS: 'profileStatsWins',
  PROFILE_STATS_LOSSES: 'profileStatsLosses',
  PROFILE_STATS_WINRATE: 'profileStatsWinrate',
} as const;

export type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];
