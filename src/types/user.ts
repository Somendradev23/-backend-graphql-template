export interface CreateUserInput {
  email: string;
  password: string;
  // mobileNumber?: string;
  name?: string;
  isDeleted?: boolean;
}

export interface UpdateUserInput extends CreateUserInput {
  id: string;
}

export interface CreateLoginInput {
  userId?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateLoginInput extends CreateLoginInput {
  id: string;
}
