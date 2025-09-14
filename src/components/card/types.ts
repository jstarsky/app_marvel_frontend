import { Character } from "@/app/characters/types";
import { HTMLAttributes, MouseEvent } from "react";

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children">,
    Character {
  isFavorite?: boolean;
  onAddFavorite?: (e: MouseEvent<HTMLDivElement>) => void;
}
