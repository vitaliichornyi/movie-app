import { Movie, PaginatedResponse } from '../types/movies';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import MovieSlider from './MovieSlider';
import MovieSliderSkeleton from './skeletons/MovieSliderSkeleton';

interface RelatedMoviesProps {
  title: string;
  movieId: number;
  type: 'similar' | 'recommendations';
}

async function fetchMovieList(
  movieId: number,
  type: 'similar' | 'recommendations',
  pageParam: number,
): Promise<PaginatedResponse<Movie>> {
  const response = await fetch(
    `/api/movies/${movieId}/${type}?page=${pageParam}`,
  );
  const { data, error } = await response.json();

  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }
  return data;
}

export default function RelatedMovies({
  title,
  movieId,
  type,
}: RelatedMoviesProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [triggerRef] = useIntersectionObserver(() => setShouldLoad(true));

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['relatedMovies', type, movieId],
      queryFn: ({ pageParam }) => fetchMovieList(movieId, type, pageParam),
      enabled: shouldLoad,

      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPageParam < lastPage.total_pages) {
          return lastPageParam + 1;
        }
        return undefined;
      },
    });

  const items = data?.pages.flatMap((page) => page.results) || [];

  const isFirstLoading = status === 'pending';
  const isError = status === 'error';
  const hasMovie = items && items.length > 0;
  const isReady = shouldLoad && !isError && !isFirstLoading;

  async function handleReachEnd() {
    if (isFetchingNextPage || !hasNextPage) return;
    await fetchNextPage();
  }

  return (
    <section className={isReady && !hasMovie ? 'hidden' : ''} ref={triggerRef}>
      {isFirstLoading && <MovieSliderSkeleton />}
      {isReady && hasMovie && (
        <MovieSlider
          items={items}
          title={title}
          hasNextPage={hasNextPage}
          fetchNextPage={handleReachEnd}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </section>
  );
}
