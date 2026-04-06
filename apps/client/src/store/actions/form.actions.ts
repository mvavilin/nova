import type {
  FormFetchDataPayload,
  FormFetchSuccessPayload,
  UpdateFieldPayload,
} from '@/components/BaseForm/BaseForm.types';

export enum FormActionTypes {
  FORM_UPDATE_FIELD = 'FORM/UPDATE_FIELD',
  FETCH_DATA = 'FORM/FETCH_DATA',
  FETCH_SUCCESS = 'FORM/FETCH_SUCCESS',
  GO_TO_LOGIN_PAGE = 'FORM/GO_TO_LOGIN_PAGE',
  GO_TO_REGISTRATION_PAGE = 'FORM/GO_TO_REGISTRATION_PAGE',
  CLEAN_DATA = 'FORM/CLEAN_DATA',
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

export type FormGoToLoginPage = {
  type: FormActionTypes.GO_TO_LOGIN_PAGE;
};

export type FormGoToRegistrationPage = {
  type: FormActionTypes.GO_TO_REGISTRATION_PAGE;
};

export type FormCleanData = {
  type: FormActionTypes.CLEAN_DATA;
};

export type FormActions =
  | FormUpdateAction
  | FormFetchData
  | FormFetchSuccess
  | FormGoToLoginPage
  | FormGoToRegistrationPage
  | FormCleanData;
