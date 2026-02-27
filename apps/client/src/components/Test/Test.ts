import { ButtonComponent, ContainerComponent, HeadingComponent } from '../../api/ComponentsAPI';
import type { TestProperties } from './Test.types';

export default class Test extends ContainerComponent {
  constructor({ ...rest }: TestProperties = {}) {
    super({
      id: 'test',
      classes: 'test',
      ...rest,
    });

    this.render();
  }

  private get test(): HTMLDivElement {
    if (!(this.element instanceof HTMLDivElement)) {
      throw new TypeError('Element is not a container');
    }
    return this.element;
  }

  private render(): void {
    console.log('Render - Test');
    const title = new HeadingComponent({ content: 'Test Component', classes: 'title' });
    title.setStyle({ color: 'lime' });

    const button = new ButtonComponent({
      content: 'Click me',
      listeners: { click: (): void => this.changeTitleColor() },
    });
    this.appendChildren([title, button]);
  }

  private changeTitleColor(): void {
    const title = this.findChildByClass('title');
    const color = title?.element?.style.color;
    if (color === 'lime') {
      title?.setStyle({ color: 'violet' });
    } else {
      title?.setStyle({ color: 'lime' });
    }
  }
}
