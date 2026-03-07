import { ButtonComponent } from '@/api/ComponentsAPI';
import type { TestButtonProperties } from './TestButton.types';

export default class TestButton extends ButtonComponent {
  constructor({ ...rest }: TestButtonProperties = {}) {
    super({
      id: 'test-button',
      classes:
        'px-6 py-2 rounded-lg bg-violet-100 text-black font-medium transition duration-200 ease-in-out hover:bg-purple-200 active:scale-95 cursor-pointer',
      ...rest,
    });

    this.render();
  }

  private render(): void {
    this.setContent('Test');
  }
}
