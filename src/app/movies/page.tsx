'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver';
import { Suspense } from 'react';
import FilterBar from '@/src/components/FilterBar';
import MoviesSkeleton from '@/src/components/skeletons/MoviesSkeleton';
import StatusMessage from '@/src/components/StatusMessage';
import Button from '@/src/components/ui/Button';
import PosterImage from '@/src/components/PosterImage';

import {
  DiscoverMovieParams,
  Movie,
  PaginatedResponse,
} from '@/src/types/movies';
import Headline from '@/src/components/ui/Headline';

async function fetchMovies(
  page: number,
  filters: DiscoverMovieParams,
): Promise<PaginatedResponse<Movie>> {
  const searchParams = new URLSearchParams(filters as Record<string, string>);
  searchParams.append('page', page.toString());

  const response = await fetch(`/api/movies?${searchParams.toString()}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }
  const { data } = await response.json();
  return data;
}

function MoviesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = Object.fromEntries(
    searchParams.entries(),
  ) as DiscoverMovieParams;

  const updateFilter = (key: keyof DiscoverMovieParams, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`/movies?${params.toString()}`);
  };

  const [triggerRef] = useIntersectionObserver(() => {
    fetchNextPage();
  });

  const {
    data,
    isPending,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies', filters],
    queryFn: ({ pageParam }) => fetchMovies(pageParam, filters),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const movieList = data?.pages.flatMap((page) => page.results) || [];
  const hasMovies = movieList.length > 0;
  const hasNoMovies = isSuccess && !hasMovies;

  return (
    <main className="layout-wrap grow">
      <Headline as="h1" variant="h1">
        Movies
      </Headline>
      <FilterBar filters={filters} onFilterChange={updateFilter} />
      <section>
        {isPending && <MoviesSkeleton />}
        {isError && <StatusMessage type="error" />}
        {hasNoMovies && <StatusMessage type="empty" />}
        {hasMovies && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movieList.map((movie, index) => (
                <PosterImage
                  key={`${movie.id}-${index}`}
                  index={index}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  width={342}
                  vote_average={movie.vote_average}
                  genre_ids={movie.genre_ids}
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
    </main>
  );
}

export default function Movies() {
  return (
    <Suspense fallback={<MoviesSkeleton />}>
      <MoviesContent />
    </Suspense>
  );
}
