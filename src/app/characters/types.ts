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
