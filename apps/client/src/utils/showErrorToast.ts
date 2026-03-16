import { Toast } from '@components';
import MessageType from '@constants/messageType';

export default function showErrorToast(error: unknown, prefix: string): void {
  let message = 'Unknown error';

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  new Toast({
    type: MessageType.ERROR,
    message: `${prefix}: ${message}`,
  });
}
