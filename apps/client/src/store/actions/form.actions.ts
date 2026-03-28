import type {
  FormFetchDataPayload,
  FormFetchSuccessPayload,
  UpdateFieldPayload,
} from '@/components/BaseForm/BaseForm.types';

export enum FormActionTypes {
  FORM_UPDATE_FIELD = 'FORM/UPDATE_FIELD',
  FETCH_DATA = 'FORM/FETCH_DATA',
  FETCH_SUCCESS = 'FORM/FETCH_SUCCESS',
  GO_TO_LOBBY_PAGE = 'FORM/GO_TO_LOBBY_PAGE',
}

export type FormUpdateAction = {
  type: FormActionTypes.FORM_UPDATE_FIELD;
  payload: UpdateFieldPayload;
};

export type FormFetchData = {
  type: FormActionTypes.FETCH_DATA;
  payload: FormFetchDataPayload;
};

export type FormFetchSuccess = {
  type: FormActionTypes.FETCH_SUCCESS;
  payload: FormFetchSuccessPayload;
};

export type FormGoToLobbyPage = {
  type: FormActionTypes.GO_TO_LOBBY_PAGE;
};

export type FormActions = FormUpdateAction | FormFetchData | FormFetchSuccess | FormGoToLobbyPage;
