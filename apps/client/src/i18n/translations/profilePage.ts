import { Language } from '@types';
import { TranslationKeys } from '../translationKeys';

const profilePage = {
  [Language.EN]: {
    [TranslationKeys.PROFILE_TITLE]: 'PROFILE',
    [TranslationKeys.PROFILE_USER_LANGUAGE]: '🌐 Language: ',
    [TranslationKeys.PROFILE_USER_ONLINE]: '🟢 Online',
    [TranslationKeys.PROFILE_USER_LEVEL]: '🏆 Level',
    [TranslationKeys.PROFILE_USER_WINRATE]: '📊 Winrate',
    [TranslationKeys.PROFILE_USER_CORRECT]: '🎯 Correct',
    [TranslationKeys.PROFILE_STATS_TITLE]: 'Статистика',
    [TranslationKeys.PROFILE_STATS_GAMES]: 'Игр сыграно',
    [TranslationKeys.PROFILE_STATS_WINS]: 'Победы',
    [TranslationKeys.PROFILE_STATS_LOSSES]: 'Поражения',
    [TranslationKeys.PROFILE_STATS_WINRATE]: 'Рейтинг',
  },
  [Language.RU]: {
    [TranslationKeys.PROFILE_TITLE]: 'ПРОФИЛЬ',
    [TranslationKeys.PROFILE_USER_LANGUAGE]: '🌐 Язык: ',
    [TranslationKeys.PROFILE_USER_ONLINE]: '🟢 Онлайн',
    [TranslationKeys.PROFILE_USER_LEVEL]: '🏆 Уровень',
    [TranslationKeys.PROFILE_USER_WINRATE]: '📊 Победы',
    [TranslationKeys.PROFILE_USER_CORRECT]: '🎯 Ответы',
    [TranslationKeys.PROFILE_STATS_TITLE]: 'Статистика',
    [TranslationKeys.PROFILE_STATS_GAMES]: 'Игр сыграно',
    [TranslationKeys.PROFILE_STATS_WINS]: 'Победы',
    [TranslationKeys.PROFILE_STATS_LOSSES]: 'Поражения',
    [TranslationKeys.PROFILE_STATS_WINRATE]: 'Рейтинг',
  },
};

export default profilePage;
