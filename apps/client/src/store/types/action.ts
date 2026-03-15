import type { WelcomePageActions } from '../actions/welcome.actions';
import type { TestPageActions } from '../actions/test.actions';
import type { FormActionsTypes } from '../actions/form.actions';
import type { SocketActions } from '../actions/socket.actions';

export type AppActions = WelcomePageActions | TestPageActions | FormActionsTypes | SocketActions;
