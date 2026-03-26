import { Language } from '@types';
import { TranslationKeys } from '@i18n/translationKeys';

const knowledgeCheckModal = {
  [Language.EN]: {
    [TranslationKeys.KNOWLEDGE_CHECK_TITLE]: 'Knowledge Check',
    [TranslationKeys.QUESTION_TOPIC]: 'Question on topic: ',
    [TranslationKeys.ENTER_ANSWER]: 'Enter your answer',
    [TranslationKeys.ANSWER_EMPTY_WARNING]: 'The field cannot be empty',
    [TranslationKeys.SEND_BUTTON]: 'Send',
    [TranslationKeys.ROLE_SPYMASTER]: 'Spymaster',
    [TranslationKeys.ROLE_OPERATIVE]: 'Operative',
  },
  [Language.RU]: {
    [TranslationKeys.KNOWLEDGE_CHECK_TITLE]: 'Проверка знаний',
    [TranslationKeys.QUESTION_TOPIC]: 'Вопрос на тему: ',
    [TranslationKeys.ENTER_ANSWER]: 'Введите ваш ответ',
    [TranslationKeys.ANSWER_EMPTY_WARNING]: 'Поле не может быть пустым',
    [TranslationKeys.SEND_BUTTON]: 'Отправить',
    [TranslationKeys.ROLE_SPYMASTER]: 'Капитан',
    [TranslationKeys.ROLE_OPERATIVE]: 'Оперативник',
  },
} as const;

export default knowledgeCheckModal;
