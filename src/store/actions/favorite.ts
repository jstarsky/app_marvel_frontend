import { Character } from "@/app/characters/types";
import {
  FAVORITE_ADD_SUCCESS,
  FAVORITE_REMOVE_SUCCESS,
} from "../constants/favorite";
import { FavoriteAction } from "../types";

export const actionFavoriteAdd = (character: Character): FavoriteAction => ({
  type: FAVORITE_ADD_SUCCESS,
  character,
});

export const actionFavoriteRemove = (character: Character): FavoriteAction => ({
  type: FAVORITE_REMOVE_SUCCESS,
  character,
});
