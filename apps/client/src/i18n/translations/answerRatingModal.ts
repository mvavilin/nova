import { Language } from '@types';
import { TranslationKeys } from '@i18n/translationKeys';

const answerRatingModal = {
  [Language.EN]: {
    [TranslationKeys.ANSWER_RATING_TITLE]: 'Opponent answer rating',
    [TranslationKeys.QUESTION_TOPIC]: 'Question on topic: ',
    [TranslationKeys.OPPONENT_ANSWER]: 'Opponent answer',
    [TranslationKeys.POSSIBLE_ANSWER]: 'Possible answer',
    [TranslationKeys.PASS_BUTTON]: 'Accepted',
    [TranslationKeys.FAIL_BUTTON]: 'Rejected',
  },
  [Language.RU]: {
    [TranslationKeys.ANSWER_RATING_TITLE]: 'Оценка ответа соперника',
    [TranslationKeys.QUESTION_TOPIC]: 'Вопрос на тему: ',
    [TranslationKeys.OPPONENT_ANSWER]: 'Ответ соперника',
    [TranslationKeys.POSSIBLE_ANSWER]: 'Возможный ответ',
    [TranslationKeys.PASS_BUTTON]: 'Зачтено',
    [TranslationKeys.FAIL_BUTTON]: 'Не зачтено',
  },
};

export default answerRatingModal;
