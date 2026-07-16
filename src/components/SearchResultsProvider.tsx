import { useInfiniteQuery } from '@tanstack/react-query';
import useDebouncedQuery from '../hooks/useDebouncedQuery';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import { Movie, PaginatedResponse } from '../types/movies';

import SearchField from './ui/SearchField';
import SearchResultSkeleton from './skeletons/SearchResultSkeleton';
import PosterImage from './PosterImage';
import StatusMessage from './StatusMessage';
import Button from './ui/Button';

async function searchMovies(
  pageParam: number,
  query: string,
): Promise<PaginatedResponse<Movie>> {
  const response = await fetch(`/api/search?query=${query}&page=${pageParam}`);
  const { data, error } = await response.json();

  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }
  return data;
}

interface SearchResultsProviderProps {
  context: 'modal' | 'page';
}

export default function SearchResultsProvider({
  context,
}: SearchResultsProviderProps) {
  const { inputValue, setInputValue, debouncedQuery } = useDebouncedQuery();

  const [triggerRef] = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const {
    data,
    status,
    fetchNextPage,
    fetchStatus,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchResults', debouncedQuery],
    queryFn: ({ pageParam }) => searchMovies(pageParam, debouncedQuery),

    enabled: debouncedQuery.length > 2,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPageParam < lastPage.total_pages) {
        return lastPageParam + 1;
      }
      return undefined;
    },
  });

  const searchResults = data?.pages.flatMap((page) => page.results) || [];

  const isFirstLoading = status === 'pending' && fetchStatus === 'fetching';
  const isError = status === 'error';
  const isReady = !isError && !isFirstLoading && debouncedQuery.length > 2;
  const hasMovie = searchResults && searchResults.length > 0;

  return (
    <>
      <SearchField
        context={context}
        value={inputValue}
        onChange={setInputValue}
      />
      <section
        className={
          context === 'modal' ? 'max-h-120 overflow-y-auto rounded-xl' : ''
        }
      >
        {isFirstLoading && <SearchResultSkeleton />}
        {isError && <StatusMessage type="error" />}
        {isReady && !hasMovie && <StatusMessage type="empty" />}
        {isReady && hasMovie && (
          <>
            <div className="grid grid-cols-3 gap-4">
              {searchResults.map((item, index) => (
                <PosterImage
                  key={item.id}
                  id={item.id}
                  index={index}
                  poster_path={item.poster_path}
                  title={item.title}
                  vote_average={item.vote_average}
                  genre_ids={item.genre_ids}
                />
              ))}
            </div>
            <div ref={triggerRef} className="my-6">
              <Button
                type="secondary"
                size="lg"
                maxWidth
                onClick={fetchNextPage}
                isDisabled={!hasNextPage}
                isLoading={isFetchingNextPage}
              >
                Load more
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
