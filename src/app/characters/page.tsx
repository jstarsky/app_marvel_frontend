"use client";

import { LayoutProvider } from "@/context/layout";
import Records from "./records";
import { CharactersProvider } from "./context";
import Detail from "./detail";
import { useState } from "react";
import { Character } from "./types";

export default function Characters() {
  const [character, setCharacter] = useState<Character | null>(null);

  return (
    <LayoutProvider className="relative flex flex-col" disablefilteringFavorites={character !== null}>
      <CharactersProvider character={character} setCharacter={setCharacter}>
        <Records />
        <Detail />
      </CharactersProvider>
    </LayoutProvider>
  );
}
