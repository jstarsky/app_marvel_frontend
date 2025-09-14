import Card from "@/components/card";
import { RefObject, useEffect, useMemo } from "react";
import { useCharactersContext } from "./context";
import InputSearch from "@/components/input-search";
import { useTranslation } from "react-i18next";
import { useLayout } from "@/context/layout";

export function Records() {
  const { t } = useTranslation();
  const {
    inputRef,
    scrollRef,
    sentinelRef,
    isFilteringFavorites,
    loading,
    favorites,
    characters,
    favoriteAdd,
    favoriteRemove,
    isFavorite,
    debouncedReset,
    loadMore,
    searchFavorites,
  } = useCharactersContext();
  const { ref: refLayout } = useLayout();

  useEffect(() => {
    const el = refLayout && "current" in refLayout ? refLayout.current : null;
    if (!el) return;

    const handler = (e: Event) => {
      if (!(e instanceof CustomEvent)) return;
      const value = e.detail as boolean | undefined;
      if (value) {
        searchFavorites(
          (inputRef as RefObject<HTMLInputElement>).current?.value
        );
      } else {
        loadMore((inputRef as RefObject<HTMLInputElement>).current?.value);
      }
    };

    el.addEventListener("changeFilterFavorites", handler as EventListener);
    return () => {
      el.removeEventListener("changeFilterFavorites", handler as EventListener);
    };
  }, [refLayout]);

  const records = useMemo(() => {
    if (isFilteringFavorites) {
      return favorites;
    }
    return characters;
  }, [characters, favorites, isFilteringFavorites]);

  return (
    <>
      <div
        className={[
          "pt-12",
          "px-4 pb-8",
          "xs:px-4 xs:pb-8",
          "sm:px-10 sm:pb-8",
          "lg:px-12 lg:pb-8",
        ].join(" ")}
      >
        <InputSearch
          ref={inputRef}
          onChange={() => debouncedReset()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              debouncedReset();
            }
          }}
          placeholder={t("search_character")}
          loading={loading}
          result={isFilteringFavorites ? favorites.length : characters.length}
        />
      </div>
      <div ref={scrollRef} className="flex-1 !overflow-y-scroll">
        <div>
          <div
            className={[
              "grid",
              "grid-cols-2",
              "xs:grid-cols-2",
              "sm:grid-cols-4",
              "lg:grid-cols-7",
              "px-4 pb-4",
              "xs:px-4 xs:pb-4",
              "sm:px-10 sm:pb-10",
              "lg:px-12 lg:pb-12",
              "gap-4",
              "min-h-0",
            ].join(" ")}
          >
            {records.length > 0 &&
              records.map((character, index) => {
                const isfavorite = isFavorite(character.id);
                return (
                  <Card
                    key={`character-${character.id}-${index}`}
                    {...character}
                    onAddFavorite={(e) => {
                      if (isfavorite) {
                        favoriteRemove(character);
                        return;
                      }
                      favoriteAdd(character);
                    }}
                    isFavorite={isfavorite}
                  />
                );
              })}
          </div>
          <div ref={sentinelRef} className="h-6" />
        </div>
      </div>
    </>
  );
}
