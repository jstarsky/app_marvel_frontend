import {
  USER_LOGING_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "@/store/constants/user";
import { UserAction, UserState } from "@/store/types";

const initialState: UserState = {
  token: null,
  user: null,
};

/**
 * User reducer function to manage authentication and session state.
 *
 * @param {UserState} state - The current state.
 * @param {UserAction} action - The dispatched action.
 * @returns {UserState} The updated state.
 * @author jstarsky
 */
const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case USER_LOGING_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
