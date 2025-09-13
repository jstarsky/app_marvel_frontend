import {
  FAVORITE_ADD_SUCCESS,
  FAVORITE_REMOVE_SUCCESS,
} from "@/store/constants/favorite";
import { FavoriteState, FavoriteAction } from "@/store/types";

const initialState: FavoriteState = {
  favorites: [],
};

/**
 * User reducer function to manage authentication and session state.
 *
 * @param {UserState} state - The current state.
 * @param {UserAction} action - The dispatched action.
 * @returns {UserState} The updated state.
 * @author jstarsky
 */
const favoriteReducer = (state = initialState, action: FavoriteAction): FavoriteState => {
  switch (action.type) {
    case FAVORITE_ADD_SUCCESS:
    return {
      ...state,
      favorites: Array.from(new Set([...state.favorites, action.id])),
    };
    case FAVORITE_REMOVE_SUCCESS:
    return {
      ...state,
      favorites: state.favorites.filter(id => id !== action.id),
    };
    default:
      return state;
  }
};

export default favoriteReducer;
