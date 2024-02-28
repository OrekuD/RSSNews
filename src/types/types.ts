export type NewsItem = {
  "dc:creator": string;
  description: string;
  guid: string;
  link: string;
  "media:content": string;
  pubDate: string;
  title: string;
};

export enum Feed {
  News = 1,
  Technology = 2,
  Entertainment = 3,
  Business = 4,
  Sports = 5,
  Fashion = 6,
  Other = 7,
  ForYou = 99,
  ReadLater = 999,
}
