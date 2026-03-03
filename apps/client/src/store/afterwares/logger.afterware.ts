import type { Afterware } from '@/api/StateAPI';

export default function logger<State>(): Afterware<State> {
  return async function afterware(context) {
    console.log('Afterware Action:', context.action.type, 'Next state:', context.nextState);
  };
}
