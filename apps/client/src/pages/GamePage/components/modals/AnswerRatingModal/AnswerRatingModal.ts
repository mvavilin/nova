import { Modal, Button } from '@components/ui';
import { ANSWER_RATING_MODAL_BACKGROUND } from '@assets/backgrounds';
import { ContainerComponent, HeadingComponent, TextComponent } from '@ComponentsAPI';
import { Timer } from '@pages/GamePage/components';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';

const QUESTION_DURATION_S = 60;

const THIS_CLASSES = {
  BACKGROUND: `bg-no-repeat bg-center bg-left bg-cover`,
  CONTAINER: `relative flex flex-col p-4 gap-4 font-text text-white bg-white/25 rounded`,
  TITLE: `font-bold text-2xl`,
  BLOCK: `flex flex-col gap-2`,
  BLOCK_TITLE: `font-bold text-lg`,
  TEXT: `text-justify`,
  TIMER: `absolute top-4 right-4`,
  ANSWER: `bg-white rounded text-black p-2 text-justify`,
  RESULT_BUTTONS: `flex w-full gap-4 justify-between`,
  PASS_BUTTON: `flex-1 bg-green-500 hover:bg-green-700 font-bold`,
  FAIL_BUTTON: `flex-1 bg-red-500 hover:bg-red-700 font-bold`,
};

type AnswerRatingModalProperties = {
  topic: string;
  question: string;
  answer: string;
  possibleAnswer: string;
};

export default class AnswerRatingModal extends Modal {
  private topic: string;
  private question: string;
  private answer: string;
  private possibleAnswer: string;

  constructor({ topic, question, answer, possibleAnswer }: AnswerRatingModalProperties) {
    super({ isClosable: false });

    this.topic = topic;
    this.question = question;
    this.answer = answer;
    this.possibleAnswer = possibleAnswer;

    this.render();
  }

  private createModalTitle(): HeadingComponent {
    return new HeadingComponent({
      level: 2,
      content: t(TranslationKeys.ANSWER_RATING_TITLE),
      classes: THIS_CLASSES.TITLE,
    });
  }

  private createQuestionBlock(): ContainerComponent {
    return new ContainerComponent({
      classes: THIS_CLASSES.BLOCK,
      children: [
        new HeadingComponent({
          level: 3,
          content: `${t(TranslationKeys.QUESTION_TOPIC)} ${this.topic}`,
          classes: THIS_CLASSES.BLOCK_TITLE,
        }),
        new TextComponent({ classes: THIS_CLASSES.TEXT, content: this.question }),
      ],
    });
  }

  private createAnswerBlock(): ContainerComponent {
    return new ContainerComponent({
      classes: THIS_CLASSES.BLOCK,
      children: [
        new HeadingComponent({
          level: 3,
          content: t(TranslationKeys.OPPONENT_ANSWER),
          classes: THIS_CLASSES.BLOCK_TITLE,
        }),
        new TextComponent({ content: this.answer, classes: THIS_CLASSES.ANSWER }),
      ],
    });
  }

  private createPossibleAnswerBlock(): ContainerComponent {
    return new ContainerComponent({
      classes: THIS_CLASSES.BLOCK,
      children: [
        new HeadingComponent({
          level: 3,
          content: t(TranslationKeys.POSSIBLE_ANSWER),
          classes: THIS_CLASSES.BLOCK_TITLE,
        }),
        new TextComponent({ content: this.possibleAnswer, classes: THIS_CLASSES.TEXT }),
      ],
    });
  }

  private createResultButtons(): ContainerComponent {
    const passButton = new Button({
      label: t(TranslationKeys.PASS_BUTTON),
      classes: THIS_CLASSES.PASS_BUTTON,
      listeners: {
        click: (): void => {
          // feat: add dispatch action for counting response
          this.hide();
        },
      },
    });

    const failButton = new Button({
      label: t(TranslationKeys.FAIL_BUTTON),
      classes: THIS_CLASSES.FAIL_BUTTON,
      listeners: {
        click: (): void => {
          // feat: add dispatch action for not counting response
          this.hide();
        },
      },
    });

    return new ContainerComponent({
      children: [passButton, failButton],
      classes: THIS_CLASSES.RESULT_BUTTONS,
    });
  }

  private createTimer(): Timer {
    const timer = new Timer(QUESTION_DURATION_S, true);
    timer.setClasses(THIS_CLASSES.TIMER);
    return timer;
  }

  public render(): void {
    const modalTitle = this.createModalTitle();
    const questionBlock = this.createQuestionBlock();
    const answerBlock = this.createAnswerBlock();
    const possibleAnswerBlock = this.createPossibleAnswerBlock();
    const resultButtons = this.createResultButtons();
    const timer = this.createTimer();

    const container = new ContainerComponent({
      classes: THIS_CLASSES.CONTAINER,
      children: [modalTitle, questionBlock, answerBlock, possibleAnswerBlock, resultButtons, timer],
    });

    super.setStyle({
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${ANSWER_RATING_MODAL_BACKGROUND})`,
    });
    super.setClasses(THIS_CLASSES.BACKGROUND);
    super.setChildren(container);
  }
}
