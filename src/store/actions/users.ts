import { USER_LOGING_SUCCESS, USER_LOGOUT_SUCCESS } from "../constants/user";
import { UserAction, User } from "../types";

export const actionLogin = (user: User, token: string): UserAction => ({
  type: USER_LOGING_SUCCESS,
  token,
  user,
});

export const actionLogout = (): UserAction => ({
  type: USER_LOGOUT_SUCCESS,
});
