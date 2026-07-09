export interface CollectionItemsParams {
  slug: string;
  page?: number;
  limit?: number;
}

export interface Collection {
  id: number;
  created_at: string;
  slug: string;
  title: string;
}
