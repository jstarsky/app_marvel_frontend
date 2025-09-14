export interface ApiResponse {
  data: {
    results: ComicData[];
  };
};


export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ComicData {
  id: number;
  title: string;
  issn?: string;
  thumbnail?: Thumbnail;
  src?: string;
  image_not_available?: boolean;
}