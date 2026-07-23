import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver';

import MovieSliderSkeleton from './skeletons/MovieSliderSkeleton';
import MovieSlider from './MovieSlider';

import { InfiniteServiceResult } from '@/src/types/services';
import { MovieExtended } from '@/src/types/movies';

async function fetchMovieCollection(
  slug: string,
  pageParam: number,
): Promise<InfiniteServiceResult<MovieExtended[]>> {
  const limit = 10;
  const response = await fetch(
    `/api/collections/${slug}?page=${pageParam}&limit=${limit}`,
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }
  const data = await response.json();
  return data;
}

export default function MovieCollection({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [triggerRef] = useIntersectionObserver(() => setShouldLoad(true));

  const {
    data,
    isPending,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['collectionItems', slug],
    queryFn: ({ pageParam }) => fetchMovieCollection(slug, pageParam),
    enabled: shouldLoad,

    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.isLastPage) return undefined;
      return lastPageParam + 1;
    },
  });

  const collection =
    data?.pages
      .flatMap((page) => page.data)
      .filter((item) => item !== null)
      .map((movie) => ({
        ...movie,
        genre_ids: movie.genres ? movie.genres.map((g) => g.id) : [],
      })) || [];

  const hasCollection = collection.length > 0;
  const shouldHide = isError || (isSuccess && !hasCollection);

  async function handleReachEnd() {
    if (isFetchingNextPage || !hasNextPage) return;
    await fetchNextPage();
  }

  return (
    <section className={shouldHide ? 'hidden' : undefined} ref={triggerRef}>
      {isPending && <MovieSliderSkeleton />}
      {hasCollection && (
        <MovieSlider
          items={collection}
          title={title}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={handleReachEnd}
        />
      )}
    </section>
  );
}
