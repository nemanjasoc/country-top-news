export interface Articles {
  customId?: number;
  title: string;
  urlToImage: string;
  description: string;
  content: string;
}

export interface News {
  articles: Articles[];
  status: string;
  totalResults: number;
}
