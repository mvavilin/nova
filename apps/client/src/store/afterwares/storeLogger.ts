import type { Afterware } from '@/api/StateAPI';

export default function loggerAfterware<State>(): Afterware<State> {
  async function afterware({
    prevState,
    nextState,
    action,
  }: Parameters<Afterware<State>>[0]): Promise<void> {
    console.group(`Action: ${action.type}`);
    console.log('Prev state:', prevState);
    console.log('Next state:', nextState);
    console.log('Action payload:', action);
    console.groupEnd();
  }

  return afterware;
}
