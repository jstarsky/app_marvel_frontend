import { useTranslation } from "react-i18next";
import { useCharactersContext } from "./context";
import { useMemo } from "react";
import { Summary } from "./types";
import Comic from "@/components/comic";

export default function Detail() {
  const { t } = useTranslation();
  const {
    character,
    setCharacter,
    isFavorite,
    favoriteRemove,
    favoriteAdd,
    resourceURI,
  } = useCharactersContext();
  const rawSrc = `${character?.thumbnail.path}.${character?.thumbnail.extension}`;
  const isImageNotAvailable = /image_not_available$/i.test(
    character?.thumbnail.path ?? ""
  );
  const src = rawSrc.startsWith("http:")
    ? rawSrc.replace(/^http:/, "https:")
    : rawSrc;

  const comicsAvailable = useMemo(() => {
    if (
      character?.comics?.items &&
      Array.isArray(character.comics.items) &&
      character.comics.items.length > 0
    ) {
      return character.comics.items;
    }
    return [];
  }, [character]);
  return (
    <div
      className={[
        "absolute inset-0",
        "bg-white",
        "data-[ishidden=true]:hidden",
        "flex",
        "flex-col",
      ]
        .filter(Boolean)
        .join(" ")}
      data-ishidden={character ? "false" : "true"}
    >
      <div
        className={["bg-black"].filter(Boolean).join(" ")}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 0 100%)",
        }}
      >
        <div
          className={[
            "flex",
            "flex-row xs:flex-col xxs:flex-col sm:flex-row",
            "gap-8",
            "xs:gap-8",
            "sm:gap-16",
            "max-w-[60rem]",
            "mx-auto",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={[
              "cursor-pointer",
              "min-w-[17rem] h-70",
              isImageNotAvailable ? "!bg-bottom-left" : "!bg-center",
              "!bg-cover",
              "bg-no-repeat",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ backgroundImage: `url(${src})` }}
            role="img"
            aria-label={character?.name || "character"}
          />
          <div className="flex-1 flex flex-col">
            <span
              className={[
                "font-marvel",
                "text-white",
                "text-sm",
                "flex",
                "gap-2",
                "uppercase",
                "cursor-pointer",
                "hover:text-primary",
                "self-end",
                "pb-12 px-4",
                "lg:pr-0",
                "md:pr-12",
                "xs:pb-0 xs:px-4",
                "sm:pb-0 sm:px-0",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={(e) => {
                e.stopPropagation();
                setCharacter(null);
              }}
            >
              <span>{t("close")}</span>
              <span>[x]</span>
            </span>
            <div
              className={[
                "flex-1",
                "text-white",
                "flex",
                "flex-col",
                "justify-center",
                "gap-6",
                "pb-12 px-4",
                "lg:pr-0",
                "md:pr-12",
                "xs:pb-0 xs:px-4",
                "sm:pb-0 sm:px-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span
                className={[
                  "text-2xl",
                  "font-bold",
                  "font-roboto-condensed",
                  "flex",
                  "justify-between",
                  "items-center",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {character?.name}
                <span
                  className={[
                    "cursor-pointer",
                    character?.id
                      ? isFavorite(character?.id)
                        ? "marvel-favourite text-primary"
                        : "marvel-favourite-outline text-white"
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    if (character?.id) {
                      if (isFavorite(character?.id)) {
                        favoriteRemove(character);
                      } else {
                        favoriteAdd(character);
                      }
                    }
                  }}
                />
              </span>
              <p className={[""].filter(Boolean).join(" ")}>
                {character?.description || t("no_description_available")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <span
        className={[
          "text-2xl",
          "font-roboto-condensed",
          "font-semibold",
          "text-black",
          "uppercase",
          "my-4",
          "max-w-[60rem]",
          "min-w-[60rem]",
          "mx-auto",
          "xs:pb-0 xs:px-4",
          "sm:pb-0 sm:px-0",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {t("comics")}
      </span>
      <div
        className={[
          "flex-1",
          "flex",
          "flex-row xs:flex-col xxs:flex-col sm:flex-row",
          "gap-8",
          "xs:gap-8",
          "sm:gap-16",
          "max-w-[60rem]",
          "mx-auto",
          "h-full",
          "min-h-0",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="w-[60rem] mx-auto overflow-x-auto overflow-y-auto scrollbar-thin md:scrollbar-primary scrollbar-primary max-h-[26rem]">
          <div className="inline-grid grid-flow-col auto-cols-[11.2rem] w-max gap-2 h-[21.3rem] items-stretch">
            {comicsAvailable.map((comic: Summary, index: number) => {
              const match = comic.resourceURI.match(/public\/(.+)/);
              const uri = match ? match[1] : undefined;
              return (
                <Comic
                  key={index}
                  uri={uri}
                  name={comic.name}
                  resource={comic.resourceURI}
                  resourceURI={resourceURI}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
