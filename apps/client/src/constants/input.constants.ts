import type { inputBlockType } from '@/types/registration.types';

export const inputNameInfo: inputBlockType = {
  id: 'userName',
  type: 'text',
  name: 'nameInput',
  placeholder: 'Enter your name...',
  autocomplete: 'off',
  minLength: '2',
  maxLength: '12',
  labelText: 'Name',
};
export const inputEmailInfo: inputBlockType = {
  id: 'userEmail',
  type: 'email',
  name: 'emailInput',
  placeholder: 'Enter your email...',
  autocomplete: 'off',
  labelText: 'Email',
};
export const inputPasswordInfo: inputBlockType = {
  id: 'userPassword',
  type: 'password',
  name: 'passwordInput',
  placeholder: 'Enter your password...',
  autocomplete: 'off',
  minLength: '6',
  maxLength: '12',
  labelText: 'Password',
};
