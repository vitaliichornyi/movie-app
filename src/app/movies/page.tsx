'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';

import Breadcrumbs from '@/src/components/ui/Breadcrumbs';
import FilterBar from '@/src/components/FilterBar';
import MoviesSkeleton from '@/src/components/skeletons/MoviesSkeleton';
import StatusMessage from '@/src/components/ui/StatusMessage';
import Button from '@/src/components/ui/Button';

import {
  GetMoviesParams,
  GetMoviesResponse,
} from '@/src/components/types/movies';

import Image from 'next/image';
import Link from 'next/link';

async function fetchMovies(
  page: any,
  filters: GetMoviesParams,
): Promise<GetMoviesResponse> {
  const searchParams = new URLSearchParams(filters as Record<string, string>);
  searchParams.append('page', page);

  const response = await fetch(`/api/movies?${searchParams.toString()}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }
  const { data } = await response.json();

  console.log(data);
  return data;
}

export default function Movies() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = Object.fromEntries(searchParams.entries()) as GetMoviesParams;

  const updateFilter = (key: keyof GetMoviesParams, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`/movies?${params.toString()}`);
  };

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
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

  const rawMovies = data?.pages.flatMap((page) => page.results) || [];

  const allMovies = rawMovies.filter(
    (movie, index, self) =>
      self.findIndex((m) => m?.id === movie?.id) === index,
  );

  const isFirstLoading = status === 'pending';
  const isError = status === 'error';
  const hasMovie = allMovies.length > 0;
  const emptyResponse = !hasMovie && !isError && !isFirstLoading;

  return (
    <main className="py-4 px-6 md:px-12">
      <Breadcrumbs />

      <FilterBar filters={filters} onFilterChange={updateFilter} />

      <section>
        {isFirstLoading && <MoviesSkeleton />}
        {isError && <StatusMessage type="error" />}
        {emptyResponse && <StatusMessage type="empty" />}
        {hasMovie && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {allMovies.map((movie, index) => (
                <div key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>
                    {movie.poster_path ? (
                      <Image
                        className="rounded-2xl"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={500}
                        height={750}
                        priority={index < 10}
                      />
                    ) : (
                      <Image
                        className="rounded-2xl"
                        src="/no-poster.jpg"
                        alt={movie.title}
                        width={500}
                        height={750}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>
            <div className="my-6">
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
