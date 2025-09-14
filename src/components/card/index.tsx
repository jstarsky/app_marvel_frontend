"use client";

// Use plain <img> to avoid next/image host validation in dev
import Favorite from "../favorite";
import { CardProps } from "./types";

export default function Card({
  id,
  name = "",
  thumbnail,
  isFavorite,
  onAddFavorite,
}: CardProps) {
  const rawSrc = `${thumbnail.path}.${thumbnail.extension}`;
  const isImageNotAvailable = /image_not_available$/i.test(thumbnail.path);
  const src = rawSrc.startsWith("http:")
    ? rawSrc.replace(/^http:/, "https:")
    : rawSrc;
  return (
    <div
      id={`card-${id}`}
      className="flex flex-col items-center overflow-hidden"
    >
      <div
        className={[
          "w-full !min-h-[11.8732rem]",
          isImageNotAvailable ? "!bg-bottom-left" : "!bg-center",
          "!bg-cover",
          "bg-no-repeat",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={name || "character"}
      />
      <div
        className={[
          "p-4",
          "gap-4",
          "flex",
          "items-center",
          "justify-between",
          "w-full",
          "h-[3.5rem]",
          "bg-black",
          "border-t-[0.33rem]",
          "border-t-[var(--color-primary)]",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 0.80rem), calc(100% - 0.80rem) 100%, 0 100%)",
        }}
      >
        <span
          className={[
            "text-left",
            "w-full",
            "text-sm",
            "text-white",
            "font-roboto",
            "uppercase",
            "truncate",
          ].join(" ")}
        >
          {name}
        </span>
        <Favorite
          id={`card-favorite-${id}`}
          isActive={isFavorite}
          onClick={onAddFavorite}
        />
      </div>
    </div>
  );
}
