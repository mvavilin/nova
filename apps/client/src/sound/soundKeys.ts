export enum SoundKeys {
  DefaultClick = 'defaultClick',
  OpenModal = 'openModal',
}

export const soundPaths: Record<SoundKeys, string> = {
  [SoundKeys.DefaultClick]: '/sounds/defaultClick.mp3',
  [SoundKeys.OpenModal]: '/sounds/openModal.mp3',
};
