import {
  FAVORITE_ADD_SUCCESS,
  FAVORITE_REMOVE_SUCCESS,
} from "../constants/favorite";
import { FavoriteAction } from "../types";

export const actionFavoriteAdd = (id: number): FavoriteAction => ({
  type: FAVORITE_ADD_SUCCESS,
  id,
});

export const actionFavoriteRemove = (id: number): FavoriteAction => ({
  type: FAVORITE_REMOVE_SUCCESS,
  id,
});
