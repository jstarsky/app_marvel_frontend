import Favorite from "@/components/favorite";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { HeaderProps } from "./types";
import { useSelector } from "react-redux";
import { FavoriteState } from "@/store/types";
import { Character } from "@/app/characters/types";

export default function Header({
  isFilteringFavorites: controlledFilteringFavorites,
  setFilteringFavorites: setControlledFilteringFavorites,
  onChangeFilterFavorites=() => {},
}: HeaderProps) {
  const [uncontrolledFilteringFavorites, setUncontrolledFilteringFavorites] =
    useState<boolean>(false);
  const isFilteringFavorites =
    controlledFilteringFavorites ?? uncontrolledFilteringFavorites;
  const setFilteringFavorites =
    setControlledFilteringFavorites ?? setUncontrolledFilteringFavorites;
  const { logout } = useAuth();
  const favorites = useSelector<
    { favoriteReducer: FavoriteState },
    Character[]
  >((state) => state?.favoriteReducer?.favorites ?? []);
  return (
    <header className="min-h-[5.25rem] bg-black flex items-center justify-between">
      <span className="pl-[1rem] sm:pl-[3rem] text-[3.25rem] md:text-[3.75rem] marvel-marvel-logo">
        <span className="path1" />
        <span className="path2" />
        <span className="path3" />
        <span className="path4" />
      </span>
      <Favorite
        className="pr-[1rem] sm:pr-[3rem]"
        size="medium"
        onLogout={() => {
          logout();
        }}
        isActive={isFilteringFavorites}
        onClick={() => {
          setFilteringFavorites(!isFilteringFavorites);
          onChangeFilterFavorites(!isFilteringFavorites);
        }}
        amount={favorites.length}
      />
    </header>
  );
}
