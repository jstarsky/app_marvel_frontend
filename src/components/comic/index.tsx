import { useEffect, useRef, useState } from "react";
import { ApiResponse, ComicData } from "./types";
import LoadingMarvel from "../loading-marvel";

export default function Comic<T extends ApiResponse>({
  uri,
  name,
  resource,
  resourceURI,
}: {
  uri?: string;
  name?: string;
  resource?: string;
  resourceURI: (uri: string) => Promise<unknown>;
}) {
  const isMounted = useRef<boolean>(false);
  const loading = useRef<boolean>(false);
  const [data, setData] = useState<ComicData | null>(null);

  async function fetchData() {
    if (!uri) return;
    if (loading.current) return;
    loading.current = true;
    const response = await resourceURI(uri);
    if (!response) return;
    const typedResponse = response as ApiResponse;
    const comic =
      typedResponse.data &&
      typedResponse.data.results &&
      typedResponse.data.results.length > 0
        ? (typedResponse.data.results[0] as ComicData)
        : null;
    if (comic?.thumbnail) {
      const rawSrc = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
      const isImageNotAvailable = /image_not_available$/i.test(
        comic.thumbnail.path
      );
      const src = rawSrc.startsWith("http:")
        ? rawSrc.replace(/^http:/, "https:")
        : rawSrc;
      comic.src = src;
      comic.image_not_available = isImageNotAvailable;
    }
    setData(comic);
    loading.current = false;
  }

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={["relative", "flex", "flex-col"].filter(Boolean).join(" ")}>
      <LoadingMarvel loading={loading.current} variant="container" />
      <div
        className={[
          "cursor-pointer",
          "flex-1",
          "max-h-[15.8rem] min-h-[15.8rem]",
          data?.image_not_available ? "!bg-bottom-left" : "!bg-center",
          "!bg-cover",
          "bg-no-repeat",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ backgroundImage: `url(${data?.src})` }}
        role="img"
        aria-label={name || "character"}
      />
      <div className="flex flex-col justify-between pt-4 h-[4.75rem]">
        <p className="font-roboto-condensed font-semibold text-sm text-black text-base/4">
          {data?.title}
        </p>
        <p className="font-roboto-condensed font-normal text-xs text-black text-base/4">
          {data?.issn}
        </p>
      </div>
    </div>
  );
}
