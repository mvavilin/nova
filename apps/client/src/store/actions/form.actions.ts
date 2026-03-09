import type {
  FormFetchDataPayload,
  FormFetchSuccessPayload,
  UpdateFieldPayload,
} from '@/components/BaseForm/BaseFormTypes';

export enum FormActions {
  FORM_UPDATE_FIELD = 'FORM_UPDATE_FIELD',
  FETCH_DATA = 'FORM_FETCH_DATA',
  FETCH_SUCCESS = 'FORM_FETCH_SUCCESS',
  GO_TO_LOBBY_PAGE = 'FORM_GO_TO_LOBBY_PAGE',
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

export type FormActionsTypes =
  | FormUpdateAction
  | FormFetchData
  | FormFetchSuccess
  | FormGoToLobbyPage;
