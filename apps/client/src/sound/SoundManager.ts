import store from '@store/store';
import type { Action } from '@/api/StateAPI';
import { SoundKeys, soundPaths } from './soundKeys';
import { getSoundKeyByAction } from './soundActions';

export default class SoundManager {
  private sounds: Record<SoundKeys, string> = soundPaths;

  constructor() {
    this.loadSounds(soundPaths);
    store.subscribe((_, action: Action) => this.handleAction(action));
  }

  public loadSounds(sounds: Record<SoundKeys, string>): void {
    this.sounds = sounds;
  }

  private play(key: SoundKeys): void {
    const source = this.sounds[key];
    if (!source) {
      console.warn(`Sound not found for key: ${key}`);
      return;
    }

    const audio = new Audio(source);
    audio.play().catch(() => console.warn(`Failed to play sound: ${key}`));
  }

  private handleAction(action: Action): void {
    const key = getSoundKeyByAction(action);
    if (key) this.play(key);
  }
}
