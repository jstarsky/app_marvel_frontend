"use client";

import Header from "@/components/header";
import { UseLayoutContext, LayoutProps } from "./types";
import { createContext, useContext, useRef, useState } from "react";

const LayoutContext = createContext<UseLayoutContext | undefined>(undefined);

export function LayoutProvider({
  children,
  className,

  ...props
}: LayoutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFilteringFavorites, setFilteringFavorites] =
    useState<boolean>(false);

  const onChangeFilterFavorites = (value?: boolean) => {
    const event = new CustomEvent("changeFilterFavorites", { detail: value });
    ref.current?.dispatchEvent(event);
  };

  return (
    <LayoutContext.Provider
      value={{ ref, isFilteringFavorites, setFilteringFavorites }}
    >
      <div
        ref={ref}
        className="h-screen flex flex-col overflow-hidden bg-white"
      >
        <Header
          isFilteringFavorites={isFilteringFavorites}
          setFilteringFavorites={setFilteringFavorites}
          onChangeFilterFavorites={onChangeFilterFavorites}
        />
        <div
          className={["grow min-h-0", className].filter(Boolean).join(" ")}
          {...props}
        >
          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
