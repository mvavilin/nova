import { TextComponent } from '@api/ComponentsAPI';

const LOGO_CLASSES = `text-2xl font-bold font-brand`;

export default class Logo extends TextComponent {
  constructor() {
    super({
      classes: LOGO_CLASSES,
      content: 'Nova Codenames Game',
    });
  }
}
