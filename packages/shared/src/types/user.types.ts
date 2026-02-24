export interface LoginUserDto {
  login: string;
  password: string;
}

export interface CreateUserDto {
  login: string;
  password: string;
  email: string;
  avatarUrl?: string;
}

export interface UpdateUserDto {
  oldPassword: string;
  newPassword: string;
  oldEmail: string;
  newEmail: string;
  oldAvatarUrl?: string;
  newAvatarUrl?: string;
}

export interface UserEntity {
  id: string;
  login: string;
  password: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
