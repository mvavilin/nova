import { HeadingComponent } from '@/api/ComponentsAPI';
import type { WelcomeHeadingProperties } from './WelcomeHeading.types';
// import store from 'store/store';
// import type { Action } from '@/api/StateAPI';
// import type { state } from 'store/types/state.types';

export default class WelcomeHeading extends HeadingComponent {
  constructor({ ...rest }: WelcomeHeadingProperties = {}) {
    super({
      id: 'welcome-heading',
      classes: 'welcome-heading',
      ...rest,
    });

    // this.addSubscriptions([appStore.subscribe((state, action) => this.changeColor(state, action))]);

    this.render();
  }

  private render(): void {
    this.setContent('NOVA CODENAMES');
    this.setStyle({ color: 'purple' });
  }

  // private changeColor(_state: AppState, action: Action): void {
  //   if (action.type !== 'CLICK_ON_CHANGE_COLOR_BUTTON') return;

  //   if (this.hasClasses('test-heading-purple')) {
  //     this.replaceClasses('test-heading-purple', 'test-heading-green');
  //     this.setStyle({ color: 'green' });
  //   } else {
  //     this.replaceClasses('test-heading-green', 'test-heading-purple');
  //     this.setStyle({ color: 'purple' });
  //   }
  // }
}
