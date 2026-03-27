import { ImageComponent } from '@ComponentsAPI';
import type { ImageComponentProperties } from '@ComponentsAPI';
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';

interface AvatarProperties extends ImageComponentProperties {
  seed: string | null;
}
const AVATAR_CLASSES = `rounded-full w-10 h-10 object-cover border-2 border-white shrink-0`;

export default class Avatar extends ImageComponent {
  constructor(properties: AvatarProperties) {
    const seedValue = properties.seed ?? 'John Doe';

    const avatarInstance = createAvatar(bottts, {
      seed: seedValue,
      size: 128,
    });

    super({
      classes: AVATAR_CLASSES,
      source: avatarInstance.toDataUri(),
      alt: 'Avatar',
      width: 40,
      height: 40,
      ...properties,
    });
  }
}
