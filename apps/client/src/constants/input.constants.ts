import type { inputBlockType } from '@/types/registration.types';

export const inputNameInfo: inputBlockType = {
  id: 'userName',
  type: 'text',
  name: 'nameInput',
  placeholder: 'Enter your name...',
  autocomplete: 'off',
  minLength: '2',
  maxLength: '16',
  pattern: /^[a-za-яёA-ZА-ЯЁ0-9-]+$/,
  errorMessage: `•\u00A0Minimum length is 2, maximum length is 20. •\u00A0Only English and Russian letters, digits and hyphen are allowed.`,
  labelText: 'Name',
};

export const inputEmailInfo: inputBlockType = {
  id: 'userEmail',
  type: 'email',
  name: 'emailInput',
  placeholder: 'Enter your email...',
  autocomplete: 'off',
  minLength: '6',
  maxLength: '30',
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  errorMessage: `•\u00A0Minimum length is 6, maximum length is 30. •\u00A0Please enter a valid email address (e.g., name@domain.com).`,
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
  pattern: /^(?=.*[A-ZА-ЯЁ])(?=.*[!@#$%^&*]).+$/,
  errorMessage: `•\u00A0Minimum length is 6, maximum length is 12.
    •\u00A0Password must contain one capital English or Russian letter and one special character.`,
  labelText: 'Password',
};
