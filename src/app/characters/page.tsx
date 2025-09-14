"use client";

import { LayoutProvider } from "@/context/layout";
import { Records } from "./records";
import { CharactersProvider } from "./context";

export default function Characters() {
  return (
    <LayoutProvider className="relative flex flex-col">
      <CharactersProvider>
        <Records />
      </CharactersProvider>
    </LayoutProvider>
  );
}
