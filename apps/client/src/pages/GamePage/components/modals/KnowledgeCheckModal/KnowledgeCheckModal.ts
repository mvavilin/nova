import { Modal, Button } from '@components/ui';
import { KNOWLEDGE_CHECK_MODALE_BACKGROUND } from '@assets/backgrounds';
import {
  ContainerComponent,
  HeadingComponent,
  TextareaComponent,
  TextComponent,
} from '@ComponentsAPI';
import { Timer } from '@pages/GamePage/components';
import { Toast } from '@components';
import MessageType from '@constants/messageType';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

const ANSWER_DURATION_S = 60;

const THIS_CLASSES = {
  BACKGROUND: `bg-no-repeat bg-center bg-top`,
  CONTAINER: `relative flex flex-col p-4 gap-4 font-text text-white bg-white/25 rounded select-none`,
  TITLE: `font-bold text-2xl`,
  BLOCK: `flex flex-col gap-2`,
  BLOCK_TITLE: `font-bold text-lg`,
  TEXTAREA: `rounded p-2 block w-full bg-white text-black`,
  TIMER: `absolute top-4 right-4`,
};

type KnowledgeCheckModalProperties = {
  topic: string;
  question: string;
};

export default class KnowledgeCheckModal extends Modal {
  private topic: string;
  private question: string;

  constructor({ topic, question }: KnowledgeCheckModalProperties) {
    super({ isClosable: false });

    this.topic = topic;
    this.question = question;

    this.render();
  }

  public render(): void {
    const modalTitle = new HeadingComponent({
      level: 2,
      content: t(TranslationKeys.KNOWLEDGE_CHECK_TITLE),
      classes: THIS_CLASSES.TITLE,
    });

    const questionBlock = new ContainerComponent({
      classes: THIS_CLASSES.BLOCK,
      children: [
        new HeadingComponent({
          level: 3,
          content: `${t(TranslationKeys.QUESTION_TOPIC)} ${this.topic}`,
          classes: THIS_CLASSES.BLOCK_TITLE,
        }),
        new TextComponent({ content: this.question }),
      ],
    });

    const answerField = new TextareaComponent({ classes: THIS_CLASSES.TEXTAREA, rows: 3 });

    const answerBlock = new ContainerComponent({
      classes: THIS_CLASSES.BLOCK,
      children: [
        new HeadingComponent({
          level: 3,
          content: t(TranslationKeys.ENTER_ANSWER),
          classes: THIS_CLASSES.BLOCK_TITLE,
        }),
        answerField,
        // feat: add dispatch action for sending response
        new Button({
          label: t(TranslationKeys.SEND_BUTTON),
          listeners: {
            click: (): void => {
              if (answerField.getValue() === '') {
                new Toast({
                  type: MessageType.WARNING,
                  message: t(TranslationKeys.ANSWER_EMPTY_WARNING),
                });
                return;
              }

              this.hide();
            },
          },
        }),
      ],
    });

    const timer = new Timer(ANSWER_DURATION_S, true);
    timer.setClasses(THIS_CLASSES.TIMER);

    const container = new ContainerComponent({
      classes: THIS_CLASSES.CONTAINER,
      children: [modalTitle, questionBlock, answerBlock, timer],
    });

    super.setStyle({ backgroundImage: `url(${KNOWLEDGE_CHECK_MODALE_BACKGROUND})` });
    super.setClasses(THIS_CLASSES.BACKGROUND);
    super.setChildren(container);
  }
}
