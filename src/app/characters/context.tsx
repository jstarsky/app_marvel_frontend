import {
  useContext,
  createContext,
  ReactNode,
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Character, UseCharactersContext } from "./types";
import useCharacters from "./hook";
import { useDebounce } from "@/hooks/debounce";
import { useLayout } from "@/context/layout";

export const CharactersContext = createContext<
  UseCharactersContext | undefined
>(undefined);

export const CharactersProvider = ({
  character: controlledCharacter,
  setCharacter: controlledSetCharacter,
  children,
}: {
  character?: Character | null;
  setCharacter?: Dispatch<SetStateAction<Character | null>>;
  children: ReactNode;
}) => {
  const [uncontrolledCharacter, setUncontrolledCharacter] =
    useState<Character | null>(null);
  const character = controlledCharacter ?? uncontrolledCharacter;
  const setCharacter = controlledSetCharacter ?? setUncontrolledCharacter;

  const { isFilteringFavorites } = useLayout();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    loading,
    error,
    characters,
    favorites,
    loadMore,
    hasMore,
    searchFavorites,
    reset,
    favoriteAdd,
    favoriteRemove,
    isFavorite,
    resourceURI,
  } = useCharacters(50, isFilteringFavorites);

  const { call: debouncedReset, cancel: cancelDebounce } = useDebounce(() => {
    reset();
    if (isFilteringFavorites) {
      searchFavorites(inputRef.current?.value);
    }
  }, 500);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = scrollRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            loadMore(inputRef.current?.value);
          }
        });
      },
      { root, rootMargin: "200px", threshold: 0 }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [loadMore, hasMore, loading]);

  useEffect(() => {
    return () => {
      cancelDebounce();
    };
  }, [cancelDebounce]);

  return (
    <CharactersContext.Provider
      value={{
        isFilteringFavorites,
        loading,
        error,
        characters,
        favorites,
        loadMore,
        hasMore,
        searchFavorites,
        reset,
        favoriteAdd,
        favoriteRemove,
        isFavorite,
        inputRef,
        scrollRef,
        sentinelRef,
        debouncedReset,
        cancelDebounce,
        character,
        setCharacter,
        resourceURI,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharactersContext = () => {
  const context = useContext(CharactersContext);
  if (!context) {
    throw new Error(
      "useCharactersContext must be used within a CharactersProvider"
    );
  }
  return context;
};
