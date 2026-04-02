// AboutUsModal.ts
import BaseModal from '../BaseModal/BaseModal';
import AboutUs from '../AboutUs/AboutUs';

export default class AboutUsModal extends BaseModal {
  constructor() {
    super([new AboutUs()]);
  }

  public open(): void {
    this.show();
  }
}
