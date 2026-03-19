import { Button } from '@components/ui';
import ICONS from '@assets/icons';
import store from '@store';
import { AppActionTypes } from '@actions';

const EXIT_BUTTON_CLASSES = `w-10 h-10 bg-transparent hover:bg-white/10`;

export default class ExitButton extends Button {
  constructor() {
    super({
      classes: EXIT_BUTTON_CLASSES,
      iconUrl: ICONS.EXIT,
      listeners: { click: () => store.dispatch({ type: AppActionTypes.EXIT_APP }) },
    });
  }
}
