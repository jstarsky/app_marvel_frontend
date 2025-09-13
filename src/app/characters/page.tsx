"use client";

import Layout from "@/components/layout";
import useCharacters from "./hook";
import LoadingMarvel from "@/components/loading-marvel";
import Card from "@/components/card";
import InputSearch from "@/components/input-search";
import { useTranslation } from "react-i18next";

export default function Characters() {
  const { t } = useTranslation();
  const { loading, characters } = useCharacters();
  return (
    <Layout className="relative flex flex-col">
      <LoadingMarvel loading={loading} variant="container" />
      <div
        className={[
          // "w-full",
          "pt-12",
          "px-4 pb-8",
          "xs:px-4 xs:pb-8",
          "sm:px-10 sm:pb-8",
          "lg:px-12 lg:pb-8",
        ].join(" ")}
      >
        <InputSearch
          placeholder={t("search_character")}
          autoFocus
          loading={loading}
          result={characters.length}
        />
      </div>
      <div className="flex-1 !overflow-y-scroll">
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
              "h-full",
              "min-h-0",
              "overflow-auto",
            ].join(" ")}
          >
            {!loading &&
              characters.length > 0 &&
              characters.map((character) => (
                <Card key={`character-${character.id}`} {...character} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
