"use client";

import Layout from "@/components/layout";
import useCharacters from "./hook";
import Card from "@/components/card";
import InputSearch from "@/components/input-search";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/debounce";

export default function Characters() {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { loading, characters, loadMore, hasMore, reset } =
    useCharacters();

  const { call: debouncedReset, cancel: cancelDebounce } = useDebounce(() => {
    reset();
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
    <Layout className="relative flex flex-col">
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
          result={characters.length}
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
            {characters.length > 0 &&
              characters.map((character) => (
                <Card key={`character-${character.id}`} {...character} />
              ))}
          </div>
          <div ref={sentinelRef} className="h-6" />
        </div>
      </div>
    </Layout>
  );
}
