export enum SoundKeys {
  DefaultClick = 'defaultClick',
  OpenModal = 'openModal',
  ChooseTeam = 'chooseTeam',
}

export const soundPaths: Record<SoundKeys, string> = {
  [SoundKeys.DefaultClick]: '/sounds/defaultClick.mp3',
  [SoundKeys.OpenModal]: '/sounds/openModal.mp3',
  [SoundKeys.ChooseTeam]: '/sounds/chooseTeam.mp3',
};
