import { Character } from "@/app/characters/types";
import { HTMLAttributes } from "react";

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, "id"| "children"> & Character;