import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver';

import CollectionSliderSkeleton from './skeletons/CollectionSliderSkeleton';
import Headline from './ui/Headline';
import StatusMessage from './StatusMessage';
import MovieSlider from './MovieSlider';

import { InfiniteServiceResult } from '@/src/types/services';
import { Movie } from '@/src/types/movies';

async function fetchMovieCollection(
  slug: string,
  pageParam: number,
): Promise<InfiniteServiceResult<Movie[]>> {
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

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['collectionItems', slug],
      queryFn: ({ pageParam }) => fetchMovieCollection(slug, pageParam),
      enabled: shouldLoad,

      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.isLastPage) return undefined;
        return lastPageParam + 1;
      },
    });

  const collectionItems =
    data?.pages.flatMap((page) => page.data).filter((item) => item !== null) ||
    [];

  const isFirstLoading = status === 'pending';
  const isError = status === 'error';
  const hasMovie = collectionItems && collectionItems.length > 0;
  const isReady = !isError && !isFirstLoading;

  return (
    <section ref={triggerRef}>
      <Headline as="h2" variant="h2">
        {title}
      </Headline>
      {isFirstLoading && <CollectionSliderSkeleton />}
      {isError && <StatusMessage type="error" />}
      {isReady && !hasMovie && <StatusMessage type="empty" />}
      {isReady && hasMovie && (
        <MovieSlider
          items={collectionItems}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </section>
  );
}
