import { Character } from "@/app/characters/types";
import { HTMLAttributes } from "react";

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children">,
    Character {
  isFavorite?: boolean;
}
