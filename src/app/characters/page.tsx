"use client";

import { LayoutProvider } from "@/context/layout";
import Records from "./records";
import { CharactersProvider } from "./context";
import Detail from "./detail";

export default function Characters() {
  return (
    <LayoutProvider className="relative flex flex-col">
      <CharactersProvider>
        <Records />
        <Detail />
      </CharactersProvider>
    </LayoutProvider>
  );
}
