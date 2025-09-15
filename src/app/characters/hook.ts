import { useCallback, useEffect, useRef, useState } from "react";
import { Character, UseCharacters } from "./types";
import marvel from "@/lib/api/marvel";
import { FavoriteAction, FavoriteState } from "@/store/types";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { actionFavoriteAdd, actionFavoriteRemove } from "@/store/actions";

export default function useCharacters(
  limit = 50,
  isFilteringFavorites = false
): UseCharacters {
  const dispatch = useDispatch<Dispatch<FavoriteAction>>();
  const favoritesStore = useSelector<
    { favoriteReducer: FavoriteState },
    Character[]
  >((state) => state?.favoriteReducer?.favorites ?? []);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const inFlight = useRef(false);
  const offsetRef = useRef(0);

  function reset() {
    setCharacters([]);
    setLoading(false);
    setError(null);
    offsetRef.current = 0;
    inFlight.current = false;
    setHasMore(true);
  }

  function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const searchFavorites = useCallback(
    (nameStartsWith?: string | null) => {
      let filtered: Character[];
      const term = (nameStartsWith || "").trim();
      if (term) {
        const pattern = "^" + escapeRegExp(term);
        const regex = new RegExp(pattern, "i");
        filtered = favoritesStore.filter((c) => regex.test(c.name.trim()));
      } else {
        filtered = favoritesStore;
      }
      setFavorites(filtered);
      setHasMore(false);
      setLoading(false);
      setError(null);
      return filtered;
    },
    [favoritesStore]
  );

  const loadMore = useCallback(
    async (nameStartsWith?: string | null, resetload: boolean = false) => {
      if (inFlight.current || !hasMore || isFilteringFavorites) return;
      if (resetload) {
        reset();
      }
      inFlight.current = true;
      setLoading(true);
      setError(null);
      try {
        const res = await marvel.get("/api/marvel/characters", {
          params: { limit, offset: offsetRef.current, nameStartsWith },
        });
        const data = (res.data?.data?.results || []) as Character[];
        const total = res.data?.data?.total || 0;
        setCharacters((prev) => [...prev, ...data]);
        offsetRef.current += data.length;
        const more = total > offsetRef.current;
        setHasMore(more);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
        inFlight.current = false;
      }
    },
    [limit, hasMore, isFilteringFavorites]
  );

  async function resourceURI(uri: string) {
    try {
      const response = await marvel.get("/api/marvel/resource", {
        params: { path: uri },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching resource:", error);
      return null;
    }
  }

  function favoriteAdd(character: Character) {
    dispatch(actionFavoriteAdd(character));
  }

  function favoriteRemove(character: Character) {
    dispatch(actionFavoriteRemove(character));
  }

  function isFavorite(id: number) {
    return favorites.some((character) => character.id === id);
  }

  useEffect(() => {
    setFavorites(favoritesStore);
  }, [favoritesStore]);

  useEffect(() => {
    reset();
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return {
    loading,
    error,
    characters,
    favorites,
    loadMore,
    hasMore,
    searchFavorites,
    reset,
    isFavorite,
    favoriteAdd,
    favoriteRemove,
    resourceURI,
  };
}
