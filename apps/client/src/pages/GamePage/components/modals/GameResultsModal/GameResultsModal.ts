import { Button, Modal } from '@components/ui';
import { GAME_RESULTS_MODAL_BACKGROUND } from '@assets/backgrounds';
import { BaseComponent, ContainerComponent, HeadingComponent, TextComponent } from '@ComponentsAPI';
import { Team, type GameResultData } from '@__mocks__';
import { Avatar } from '@components';
import { TEAM_HEADER_CLASSES } from '@pages/GamePage/components/TeamHeader/TeamHeader';

const THIS_CLASSES = {
  BACKGROUND: `bg-no-repeat bg-center bg-cover`,
  CONTAINER: `relative flex flex-col p-4 gap-4 font-text text-slate-900 bg-white/75 rounded select-none`,
  TITLE: `font-bold text-2xl text-center`,
  RED_TEAM_SPAN: `text-red-500`,
  BLUE_TEAM_SPAN: `text-blue-500`,
  BLOCK: `flex flex-col gap-2`,
  BLOCK_TITLE: `font-bold text-lg`,
  TEXTAREA: `rounded p-2 block w-full bg-white text-black`,
  TIMER: `absolute top-4 right-4`,
  SCORE_TIME_BLOCK: `flex gap-4`,
  SCORE_TIME_BLOCK_ITEM: `flex gap-2 items-center justify-start`,
  SCORE_TIME_BLOCK_INFO: `font-bold text-lg py-1 px-2 bg-white rounded`,
  PLAY_TITLE_LIST: `grid grid-cols-[2fr_1fr_1fr_1fr] gap-1 font-bold bg-white rounded py-1 px-2`,
  PLAY_TITLE_ITEM: `flex items-center justify-center text-center leading-none`,
  PLAYERS_LIST: `flex flex-col gap-1`,
  PLAYER_ITEM_CONTAINER: `grid grid-cols-[2fr_1fr_1fr_1fr] gap-1 bg-white rounded py-1 px-2`,
  PLAYER_ITEM: `text-center truncate`,
  NAV_BUTTONS: `flex w-full gap-4 justify-between`,
  LOBBY_BUTTON: `flex-1 font-bold`,
  ROOM_BUTTON: `flex-1 bg-violet-500 hover:bg-violet-700 font-bold`,
};

export type GameResultsModalProperties = {
  winningTeam: Team;
  gameId: string;
  score: string;
  time: string;
  redTeamPlayers: GameResultData[];
  blueTeamPlayers: GameResultData[];
};

export default class GameResultsModal extends Modal {
  private winningTeam: Team;
  private gameId: string;
  private score: string;
  private time: string;
  private redTeamPlayers: GameResultData[];
  private blueTeamPlayers: GameResultData[];

  constructor({
    winningTeam,
    gameId,
    score,
    time,
    redTeamPlayers,
    blueTeamPlayers,
  }: GameResultsModalProperties) {
    super({ isClosable: false });

    this.winningTeam = winningTeam;
    this.gameId = gameId;
    this.score = score;
    this.time = time;
    this.redTeamPlayers = redTeamPlayers;
    this.blueTeamPlayers = blueTeamPlayers;

    this.render();
  }

  private createTeamSpan(): BaseComponent {
    return this.winningTeam === Team.RED
      ? new BaseComponent({
          tag: `span`,
          content: `красных`,
          classes: THIS_CLASSES.RED_TEAM_SPAN,
        })
      : new BaseComponent({
          tag: `span`,
          content: `синих`,
          classes: THIS_CLASSES.BLUE_TEAM_SPAN,
        });
  }

  private createModalTitle(): HeadingComponent {
    const teamSpan = this.createTeamSpan();

    const modalTitle = new HeadingComponent({
      level: 2,
      classes: THIS_CLASSES.TITLE,
      content: '',
    });

    modalTitle.setChildren([
      new TextComponent({ content: `Игра завершена!` }),
      new BaseComponent({
        tag: `p`,
        children: [
          new BaseComponent({ tag: `span`, content: `Команда ` }),
          teamSpan,
          new BaseComponent({ tag: `span`, content: ` выйграла!` }),
        ],
      }),
    ]);

    return modalTitle;
  }

  private createModalSubTitle(): HeadingComponent {
    return new HeadingComponent({
      level: 3,
      content: `Статистика игры ${this.gameId}`,
      classes: THIS_CLASSES.BLOCK_TITLE,
    });
  }

  private createScoreTimeBlock(): ContainerComponent {
    const scoreBlock = new ContainerComponent({
      classes: THIS_CLASSES.SCORE_TIME_BLOCK_ITEM,
      children: [
        new TextComponent({ content: `Счет` }),
        new TextComponent({ content: this.score, classes: THIS_CLASSES.SCORE_TIME_BLOCK_INFO }),
      ],
    });

    const timeBlock = new ContainerComponent({
      classes: THIS_CLASSES.SCORE_TIME_BLOCK_ITEM,
      children: [
        new TextComponent({ content: `Время` }),
        new TextComponent({ content: this.time, classes: THIS_CLASSES.SCORE_TIME_BLOCK_INFO }),
      ],
    });

    return new ContainerComponent({
      children: [scoreBlock, timeBlock],
      classes: THIS_CLASSES.SCORE_TIME_BLOCK,
    });
  }

  private createPlayersTitleList(): TextComponent {
    return new TextComponent({
      classes: THIS_CLASSES.PLAY_TITLE_LIST,
      children: [
        new BaseComponent({ tag: `p`, classes: THIS_CLASSES.PLAY_TITLE_ITEM, content: `Игрок` }),
        new BaseComponent({ tag: `p`, classes: THIS_CLASSES.PLAY_TITLE_ITEM, content: `Роль` }),
        new BaseComponent({
          tag: `p`,
          classes: THIS_CLASSES.PLAY_TITLE_ITEM,
          content: `Вопросов`,
        }),
        new BaseComponent({
          tag: `p`,
          classes: THIS_CLASSES.PLAY_TITLE_ITEM,
          content: `Зачтено ответов`,
        }),
      ],
    });
  }

  private createTeamPlayersList(
    teamPlayers: GameResultData[],
    teamName: string,
    teamClass: string
  ): ContainerComponent {
    const teamPlayerItems: BaseComponent[] = teamPlayers.map((playerData) => {
      return new BaseComponent({
        tag: `li`,
        classes: THIS_CLASSES.PLAYER_ITEM_CONTAINER,
        children: [
          new ContainerComponent({
            classes: `flex gap-2 justify-center`,
            children: [
              new Avatar({
                classes:
                  TEAM_HEADER_CLASSES.AVATAR_BORDER[playerData.player.team][playerData.player.role],
                width: 25,
                height: 25,
              }),
              new TextComponent({
                content: `${playerData.player.username}`,
                classes: THIS_CLASSES.PLAYER_ITEM,
              }),
            ],
          }),
          new TextComponent({
            content: `${playerData.player.role}`,
            classes: THIS_CLASSES.PLAYER_ITEM,
          }),
          new TextComponent({
            content: `${playerData.questionCount}`,
            classes: THIS_CLASSES.PLAYER_ITEM,
          }),
          new TextComponent({
            content: `${playerData.correctAnswersCount}`,
            classes: THIS_CLASSES.PLAYER_ITEM,
          }),
        ],
      });
    });

    return new ContainerComponent({
      children: [
        new HeadingComponent({ level: 3, content: teamName, classes: teamClass }),
        new BaseComponent({
          tag: `ul`,
          classes: THIS_CLASSES.PLAYERS_LIST,
          children: teamPlayerItems,
        }),
      ],
    });
  }

  private createNavButtons(): ContainerComponent {
    const LobbyButton = new Button({
      label: `В лобби`,
      classes: THIS_CLASSES.LOBBY_BUTTON,
      listeners: {
        click: (): void => {
          LobbyButton.setDisabled(true);
          // feat: add dispatch action for navigating to lobby
          this.hide();
        },
      },
    });

    const RoomButton = new Button({
      label: `В комнату`,
      classes: THIS_CLASSES.ROOM_BUTTON,
      listeners: {
        click: (): void => {
          RoomButton.setDisabled(true);
          // feat: add dispatch action for navigating to room
          this.hide();
        },
      },
    });

    return new ContainerComponent({
      children: [RoomButton, LobbyButton],
      classes: THIS_CLASSES.NAV_BUTTONS,
    });
  }

  public render(): void {
    const modalTitle = this.createModalTitle();
    const modalSubTitle = this.createModalSubTitle();
    const scoreTimeBlock = this.createScoreTimeBlock();
    const playersTitleList = this.createPlayersTitleList();

    const redTeamPlayersList = this.createTeamPlayersList(
      this.redTeamPlayers,
      `Команда красных`,
      THIS_CLASSES.RED_TEAM_SPAN
    );
    const blueTeamPlayersList = this.createTeamPlayersList(
      this.blueTeamPlayers,
      `Команда синих`,
      THIS_CLASSES.BLUE_TEAM_SPAN
    );

    const navButtons = this.createNavButtons();

    const container = new ContainerComponent({
      classes: THIS_CLASSES.CONTAINER,
      children: [modalTitle, modalSubTitle, scoreTimeBlock, playersTitleList],
    });

    if (this.winningTeam === Team.RED)
      container.appendChildren([redTeamPlayersList, blueTeamPlayersList]);
    else container.appendChildren([blueTeamPlayersList, redTeamPlayersList]);

    container.appendChildren(navButtons);

    super.setStyle({ backgroundImage: `url(${GAME_RESULTS_MODAL_BACKGROUND})` });
    super.setClasses(THIS_CLASSES.BACKGROUND);
    super.setChildren(container);
  }
}
