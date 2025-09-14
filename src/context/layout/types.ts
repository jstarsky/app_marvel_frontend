import { Dispatch, HTMLAttributes, Ref, RefObject, SetStateAction } from "react";

export interface UseLayoutContext {
  ref: Ref<HTMLDivElement> | RefObject<HTMLDivElement>;
  isFilteringFavorites: boolean;
  setFilteringFavorites?: Dispatch<SetStateAction<boolean>>;
}

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  disablefilteringFavorites?: boolean;
}
