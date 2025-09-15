import { Dispatch, Ref, RefObject, SetStateAction } from "react";

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Summary {
  name: string;
  resourceURI: string;
}

export interface Resource {
  available: number;
  collectionURI: string;
  items: Summary[];
  returned: number;
}

export interface Url {
  type: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Resource;
  events: Resource;
  series: Resource;
  stories: Resource;
  urls: Url[];
  modified: Date;
}

export interface Comic {
  id: number;
  title: string;
  issn?: string;
  thumbnail?: Thumbnail;
}

export interface UseCharacters {
  loading: boolean;
  error: string | null;
  characters: Character[];
  favorites: Character[];
  loadMore: (nameStartsWith?: string) => void;
  hasMore: boolean;
  searchFavorites: (nameStartsWith?: string) => void;
  reset: () => void;
  isFavorite: (id: number) => boolean;
  favoriteAdd: (character: Character) => void;
  favoriteRemove: (character: Character) => void;
  resourceURI: (uri: string) => Promise<unknown>;
}

export interface UseCharactersContext extends UseCharacters {
  isFilteringFavorites: boolean;
  inputRef?: RefObject<HTMLInputElement> | Ref<HTMLInputElement>;
  scrollRef?: RefObject<HTMLDivElement> | Ref<HTMLDivElement>;
  sentinelRef?: RefObject<HTMLDivElement> | Ref<HTMLDivElement>;
  debouncedSearch: () => void;
  cancelDebounce: () => void;
  character: Character | null;
  setCharacter: Dispatch<SetStateAction<Character | null>>;
}
