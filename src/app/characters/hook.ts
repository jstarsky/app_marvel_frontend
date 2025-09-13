import { useEffect, useRef, useState } from "react";
import { Character } from "./types";
import marvel from "@/lib/api/marvel";

export default function useCharacters(limit = 50) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const inFlight = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    if (completed.current || inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError(null);
    marvel
      .get("/api/marvel/characters", { params: { limit } })
      .then((res) => {
        const data = res.data?.data?.results || [];
        setCharacters(data as Character[]);
        completed.current = true;
      })
      .catch((err) => {
        setError((err as any)?.message || String(err));
      })
      .finally(() => {
        setLoading(false);
        inFlight.current = false;
      });
  }, [limit]);

  return { characters, loading, error };
}
