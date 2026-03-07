import type { WelcomePageActions } from '../actions/welcome.actions';
import type { TestPageActions } from '../actions/test.actions';
import type { FormUpdateAction } from '../actions/baseForm.actions';

export type Actions = WelcomePageActions | TestPageActions | FormUpdateAction;
