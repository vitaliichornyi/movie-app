import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver';

import { CollectionItemsPageResult } from '../types/collections';

import CollectionSliderSkeleton from '../skeletons/CollectionSliderSkeleton';
import StatusMessage from './StatusMessage';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import PosterImage from './PosterImage';

async function fetchCollectionItems(
  slug: string,
  pageParam: number,
): Promise<CollectionItemsPageResult> {
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

export default function CollectionItem({
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
      queryFn: ({ pageParam }) => fetchCollectionItems(slug, pageParam),
      enabled: shouldLoad,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.isLastPage) return undefined;
        return lastPageParam + 1;
      },
    });

  function handleReachEnd() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const collectionItems =
    data?.pages.flatMap((page) => page.data).filter((item) => item !== null) ||
    [];

  const isFirstLoading = status === 'pending';
  const isError = status === 'error';
  const hasMovie = collectionItems && collectionItems.length > 0;
  const isReady = !isError && !isFirstLoading;

  return (
    <div className="flex flex-col gap-4" ref={triggerRef}>
      <h2>{title}</h2>
      {isFirstLoading && <CollectionSliderSkeleton />}
      {isError && <StatusMessage type="error" />}

      {isReady && !hasMovie && <StatusMessage type="empty" />}
      {isReady && hasMovie && (
        <div>
          <Swiper
            className="flex-1 min-w-0"
            slidesPerView={3}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 7 },
              1536: { slidesPerView: 8 },
            }}
            onReachEnd={handleReachEnd}
          >
            {collectionItems.map((collectionItem, index) => (
              <SwiperSlide key={collectionItem.id}>
                <PosterImage
                  index={index}
                  id={collectionItem.id}
                  title={collectionItem.title}
                  poster_path={collectionItem.poster_path}
                  width={185}
                />
              </SwiperSlide>
            ))}
            {isFetchingNextPage && (
              <SwiperSlide>
                <div className="flex items-center justify-center w-full aspect-[2/3] rounded-2xl">
                  <div className="animate-spin h-5 w-5 rounded-full border-2 border-current border-t-transparent" />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
}
