import { useCallback, useEffect, useRef, useState } from "react";
import { Character } from "./types";
import marvel from "@/lib/api/marvel";

export default function useCharacters(limit = 50) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const inFlight = useRef(false);
  const offsetRef = useRef(0);

  function reset() {
    setLoading(false);
    setError(null);
    setCharacters([]);
    offsetRef.current = 0;
    inFlight.current = false;
    setHasMore(true);
  }

  const loadMore = useCallback(
    async (nameStartsWith?: string | null) => {
      if (inFlight.current || !hasMore) return;
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
        setError((err as any)?.message || String(err));
      } finally {
        setLoading(false);
        inFlight.current = false;
      }
    },
    [limit, hasMore]
  );

  // initial load / reset when limit changes
  useEffect(() => {
    setCharacters([]);
    offsetRef.current = 0;
    setHasMore(true);
    // call initial load
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return {
    characters,
    loading,
    error,
    loadMore,
    hasMore,
    reset,
  } as const;
}
