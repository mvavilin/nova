import type {
  FormFetchDataPayload,
  FormFetchSuccessPayload,
  UpdateFieldPayload,
} from '@/components/BaseForm/BaseFormTypes';

export enum FormActions {
  FORM_UPDATE_FIELD = 'FORM/UPDATE_FIELD',
  FETCH_DATA = 'FORM/FETCH_DATA',
  FETCH_SUCCESS = 'FORM/FETCH_SUCCESS',
  GO_TO_LOBBY_PAGE = 'FORM/GO_TO_LOBBY_PAGE',
  SWITCH_LANGUAGE = 'FORM/SWITCH_LANGUAGE',
}

export type FormUpdateAction = {
  type: FormActions.FORM_UPDATE_FIELD;
  payload: UpdateFieldPayload;
};

export type FormFetchData = {
  type: FormActions.FETCH_DATA;
  payload: FormFetchDataPayload;
};

export type FormFetchSuccess = {
  type: FormActions.FETCH_SUCCESS;
  payload: FormFetchSuccessPayload;
};

export type FormGoToLobbyPage = {
  type: FormActions.GO_TO_LOBBY_PAGE;
};

export type SwitchLanguage = {
  type: FormActions.SWITCH_LANGUAGE;
};

export type FormActionsTypes =
  | FormUpdateAction
  | FormFetchData
  | FormFetchSuccess
  | FormGoToLobbyPage
  | SwitchLanguage;
