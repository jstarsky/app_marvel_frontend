import { Dispatch, SetStateAction } from "react";

export interface HeaderProps {
  isFilteringFavorites?: boolean;
  setFilteringFavorites?: Dispatch<SetStateAction<boolean>>;
  onChangeFilterFavorites?: (value: boolean) => void;
  disablefilteringFavorites?: boolean;
}
