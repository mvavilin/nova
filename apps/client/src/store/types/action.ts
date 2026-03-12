import type { WelcomePageActions } from '../actions/welcome.actions';
import type { TestPageActions } from '../actions/test.actions';
import type { FormActionsTypes } from '../actions/form.actions';

export type AppActions = WelcomePageActions | TestPageActions | FormActionsTypes;
