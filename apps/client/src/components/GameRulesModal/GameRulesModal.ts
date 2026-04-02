// GameRulesModal.ts
import BaseModal from '../BaseModal/BaseModal';
import GameRules from '../GameRules/GameRules';

export default class GameRulesModal extends BaseModal {
  constructor() {
    super([new GameRules()]);
  }

  public open(): void {
    this.show();
  }
}
