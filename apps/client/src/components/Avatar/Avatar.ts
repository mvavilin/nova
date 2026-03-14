import { ImageComponent } from '@ComponentsAPI';
import type { ImageComponentProperties } from '@ComponentsAPI';

const AVATAR_CLASSES = `rounded-full w-10 h-10 object-cover border-2 border-white`;

type AvatarProperties = ImageComponentProperties;

const DEFAULT_AVATAR_PROPERTIES: AvatarProperties = {
  source: 'https://i.pinimg.com/736x/78/7b/87/787b8797600f85304373da5d5b6aab68.jpg',
  alt: 'Аватар',
  width: 40,
  height: 40,
};

export default class Avatar extends ImageComponent {
  constructor(properties: AvatarProperties = {}) {
    super({
      classes: AVATAR_CLASSES,
      ...DEFAULT_AVATAR_PROPERTIES,
      ...properties,
    });
  }
}
