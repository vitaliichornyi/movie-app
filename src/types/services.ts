export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}

export interface InfiniteServiceResult<T> extends ServiceResult<T> {
  isLastPage: boolean;
}
