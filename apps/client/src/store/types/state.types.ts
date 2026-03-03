export interface State {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  status: string;
  page: string;
  title: string;
  count: number;
}

// suggestion

import { type UserStatus } from '@types';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  status: UserStatus;
  page: string;
  title: string;
  count: number;
}
