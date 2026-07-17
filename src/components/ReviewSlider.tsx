'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { PaginatedResponse, ReviewResults } from '../types/movies';

import ShowMoreButton from './ui/ShowMoreButton';
import Headline from './ui/Headline';
import SliderNavButton from './ui/SliderNavButton';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingContainer from './LoadingContainer';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import ReviewSliderSkeleton from './skeletons/ReviewSliderSkeleton';

interface ReviewSliderProps {
  title: string;
  movieId: number;
}

async function fetchReview(
  movieId: number,
  pageParam: number,
): Promise<PaginatedResponse<ReviewResults>> {
  const response = await fetch(
    `/api/movies/${movieId}/reviews?page=${pageParam}`,
  );
  const { data, error } = await response.json();

  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }
  return data;
}

export default function ReviewSlider({ title, movieId }: ReviewSliderProps) {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [triggerRef] = useIntersectionObserver(() => setShouldLoad(true));

  const router = useRouter();

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['reviews', movieId],
    queryFn: ({ pageParam }) => fetchReview(movieId, pageParam),
    enabled: shouldLoad,

    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPageParam < lastPage.total_pages) {
        return lastPageParam + 1;
      }
      return undefined;
    },
  });

  const reviewResults = data?.pages.flatMap((page) => page.results) || [];
  const totalReviews = data?.pages[0].total_results || 0;

  const isFirstLoading = shouldLoad && status === 'pending';
  const isError = status === 'error';
  const isReady = shouldLoad && !isError && !isFirstLoading;
  const hasResults = reviewResults.length > 0;

  useEffect(() => {
    if (isError) {
      console.error(
        `[ReviewSlider] Failed to load reviews for movie ID ${movieId}:`,
        error,
      );
    }
  }, [error, isError]);

  useEffect(() => {
    if (isReady && !hasResults) {
      console.warn(
        `[ReviewSlider] Empty review array returned for movie ID ${movieId}`,
      );
    }
  }, [isReady, hasResults]);

  async function handleReachEnd() {
    if (isFetchingNextPage || !hasNextPage) return;
    await fetchNextPage();
  }

  return (
    <section
      ref={triggerRef}
      className={isReady && !hasResults ? 'hidden' : ''}
    >
      <Headline as="h2" variant="h2" totalResults={totalReviews}>
        {title}
      </Headline>
      {isFirstLoading && <ReviewSliderSkeleton />}
      {isReady && hasResults && (
        <div className="relative w-full">
          <SliderNavButton btnRef={setPrevEl} direction="prev" />
          <SliderNavButton btnRef={setNextEl} direction="next" />
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevEl,
              nextEl: nextEl,
            }}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 4, slidesPerGroup: 4 },
              1536: { slidesPerView: 6, slidesPerGroup: 6 },
            }}
            onReachEnd={handleReachEnd}
          >
            {reviewResults.map((review, index) => (
              <SwiperSlide
                key={`${review.id}-${index}`}
                className="px-6 py-6 rounded-2xl bg-surface-container"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface-variant">
                    {review.author}
                  </span>
                  <div className="pb-4">
                    <p className="line-clamp-3">{review.content}</p>
                    {/* <ShowMoreButton onClick={() => router.push('/')} /> */}
                  </div>
                  <span className="text-sm text-on-surface-variant">
                    {Intl.DateTimeFormat('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(review.created_at))}
                  </span>
                </div>
              </SwiperSlide>
            ))}
            {isFetchingNextPage && (
              <div className="flex items-center justify-center w-full h-44">
                <div className="animate-spin h-5 w-5 rounded-full border-2 border-current border-t-transparent" />
              </div>
            )}
          </Swiper>
        </div>
      )}
    </section>
  );
}
