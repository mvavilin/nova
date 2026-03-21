import { ContainerComponent, HeadingComponent, ListComponent } from '@/api/ComponentsAPI';
import type { CommandSectionProps } from './RoomCommandSection.types';
import RoomItem from '../RoomItem/RoomItem';
import RoomCommandButtons from '../RoomCommandButtons/RoomCommandButtons';

const sectionStyle = {
  container:
    'w-[45%] min-[950px]:w-[40%] min-w-[350px] shrink-0 flex flex-col flex-wrap gap-8 justify-between items-center text-white text-lg p-5',
  containerRed: 'bg-gradient-to-br from-red-600/25 to-white/25 rounded',
  containerBlue: 'bg-gradient-to-br from-cyan-600/25 to-white/25 rounded',
  titleRed: 'text-2xl text-red-500 font-bold',
  titleBlue: 'text-2xl text-cyan-500 font-bold',
  list: 'w-full flex flex-col items-stretch',
};

const header = {
  number: '№',
  player: { username: 'Player', role: 'Role' },
};

export default class RoomCommandSection extends ContainerComponent {
  private playersList: RoomItem[] = [];

  constructor({ commandName, players }: CommandSectionProps) {
    const containerStyle =
      commandName === 'red' ? sectionStyle.containerRed : sectionStyle.containerBlue;

    const titleStyle = commandName === 'red' ? sectionStyle.titleRed : sectionStyle.titleBlue;

    super({ tag: 'section', classes: `${sectionStyle.container} ${containerStyle}` });

    const title = new HeadingComponent({
      level: 3,
      classes: titleStyle,
      content: commandName[0]?.toUpperCase() + commandName.slice(1),
    });

    const list = new ListComponent({ type: 'ol', classes: sectionStyle.list });

    const headerRow = new RoomItem(header);
    for (const [index, player] of players.entries()) {
      const options = { number: `${index + 1}.`, player };
      const item = new RoomItem(options);
      this.playersList.push(item);
    }

    list.appendChildren([headerRow, ...this.playersList]);
    const buttons = new RoomCommandButtons({ command: commandName });
    this.appendChildren([title, list, buttons]);
  }
}
