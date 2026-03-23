import EXIT_ICON_URL from '@assets/icons/square-arrow-right-exit.png';
import X_ICON_URL from '@assets/icons/x.png';
import SEND_ICON_URL from '@assets/icons/send.png';
import {
  CIRCLE_ALERT_ICON_URL,
  CIRCLE_CHECK_ICON_URL,
  INFO_ICON_URL,
  TRIANGLE_ALERT_ICON_URL,
} from '@assets/icons/toast';

const ICONS = {
  EXIT: EXIT_ICON_URL,
  X: X_ICON_URL,
  CIRCLE_ALERT: CIRCLE_ALERT_ICON_URL,
  CIRCLE_CHECK: CIRCLE_CHECK_ICON_URL,
  INFO: INFO_ICON_URL,
  TRIANGLE_ALERT: TRIANGLE_ALERT_ICON_URL,
  SEND: SEND_ICON_URL,
} as const;

export default ICONS;
