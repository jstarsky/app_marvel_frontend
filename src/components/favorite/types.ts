import { HTMLAttributes, MouseEvent } from "react";

export interface FavoriteProps extends HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium";
  isActive?: boolean;
  amount?: number;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onLogout?: (e: MouseEvent<HTMLDivElement>) => void;
}
