import type { WelcomePageActions } from '../actions/welcome.actions';
import type { TestPageActions } from '../actions/test.actions';
import type { RegistrationPageActions } from '@store/actions/registration.actions';

export type Actions = WelcomePageActions | TestPageActions | RegistrationPageActions;
