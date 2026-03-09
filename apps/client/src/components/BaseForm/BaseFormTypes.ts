import type { ButtonComponent } from '@/api/ComponentsAPI';
import type { FieldName } from '../InputForm/InputForm.type';
import type InputForm from '../InputForm/InputForm';
import type RegistrationHeading from '@/pages/RegistrationPage/RegistrationHeading/RegistartionHeading';
import type { User } from '@/types/user.types';

export type FormType = 'registration' | 'login' | 'profile';

export interface BaseFormProps {
  formId: FormType;
  title: RegistrationHeading;
  inputArray: InputForm[];
  buttonSubmit: ButtonComponent;
}

export interface FieldState {
  value: string;
  isValid: boolean;
  isChanged: boolean;
  error: string;
}

export interface FormState {
  fields: Partial<Record<FieldName, FieldState>>;
  isFormValid: boolean;
}

export interface GlobalFormState {
  registration: FormState;
  login: FormState;
  profile: FormState;
}

export interface UpdateFieldPayload {
  formId: FormType;
  fieldName: FieldName;
  value: string;
  isValid: boolean;
  errorMessage: string;
}

export interface FormFetchDataPayload {
  formId: FormType;
  formData: FormData;
}

export interface FormData {
  username?: string;
  email?: string;
  password?: string;
}

export interface FormFetchSuccessPayload {
  user: User;
  token: string | null;
}
