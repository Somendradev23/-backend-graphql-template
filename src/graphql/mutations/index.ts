
import { createUser, fogetPassword, changePassword, createUserByProvider } from "./user/login";
export const mutationResolvers = {
  createUser,
  fogetPassword,
  createUserByProvider,
  changePassword,
};
