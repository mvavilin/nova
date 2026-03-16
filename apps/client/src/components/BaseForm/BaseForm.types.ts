import type { ButtonComponent, HeadingComponent } from '@/api/ComponentsAPI';
import type { FieldName } from '../InputForm/InputForm.types';
import type InputForm from '../InputForm/InputForm';
import type { AuthResponse } from '@/types/user.types';
import type { Overlay } from '../ui';

export type FormType = 'registration' | 'login' | 'profile';

export interface BaseFormProps {
  formId: FormType;
  title: HeadingComponent;
  inputArray: InputForm[];
  buttonSubmit: ButtonComponent;
}

export interface FieldState {
  value: string;
  isValid: boolean;
  isChanged: boolean;
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
}

export interface FormFetchDataPayload {
  formId: FormType;
  formData: FormFields;
  loader: Overlay;
  onFinished: () => void;
}

export interface FormFields {
  username?: string;
  email?: string;
  password?: string;
}

export interface FormFetchSuccessPayload {
  user: AuthResponse;
  token: string | null;
}
