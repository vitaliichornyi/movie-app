import { Movie } from './movies';

export interface GetCollectionItemsParams {
  slug: string;
  page?: number;
  limit?: number;
}

export interface Collections {
  id: number;
  created_at: string;
  slug: string;
  title: string;
}

export interface GetCollectionsResult {
  data: Collections[] | null;
  error: string | null;
}

export interface CollectionItemsPageResult {
  data: Movie[] | null;
  isLastPage: boolean;
  error: string | null;
}

export interface CollectionItemsResult {
  data: Movie[] | null;
  error: string | null;
}
