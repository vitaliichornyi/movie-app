'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Credits } from '../types/movies';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SliderNavButton from './ui/SliderNavButton';

import Headline from './ui/Headline';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import CreditsSliderSkeleton from './skeletons/CreditsSliderSkeleton';

interface CreditsSliderProps {
  title: string;
  movieId: number;
}

async function fetchCredits(movieId: number): Promise<Credits> {
  const response = await fetch(`/api/movies/${movieId}/credits`);
  const { data, error } = await response.json();

  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }
  return data;
}

export default function CreditsSlider({ title, movieId }: CreditsSliderProps) {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [triggerRef] = useIntersectionObserver(() => setShouldLoad(true));

  const { isPending, isError, error, isSuccess, data } = useQuery({
    queryKey: ['credits', movieId],
    queryFn: () => fetchCredits(movieId),
    enabled: shouldLoad,
  });

  const hasCredits = data?.cast && data.cast.length > 0;
  const shouldHide = isError || (isSuccess && !hasCredits);

  useEffect(() => {
    if (isError) {
      console.error(
        `[CreditsSlider] Failed to load credits for movie ID ${movieId}:`,
        error,
      );
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && !hasCredits) {
      console.warn(
        `[CreditsSlider] Empty cast/crew array returned for movie ID ${movieId}`,
      );
    }
  }, [isSuccess, hasCredits]);

  return (
    <>
      <section className={shouldHide ? 'hidden' : undefined} ref={triggerRef}>
        {isPending && <CreditsSliderSkeleton />}
        {hasCredits && (
          <>
            <Headline as="h2" variant="h2">
              {title}
            </Headline>
            <div className="relative w-full">
              <SliderNavButton btnRef={setPrevEl} direction="prev" />
              <SliderNavButton btnRef={setNextEl} direction="next" />
              <Swiper
                modules={[Navigation, FreeMode]}
                navigation={{
                  prevEl: prevEl,
                  nextEl: nextEl,
                }}
                freeMode={true}
                slidesPerView={4}
                slidesPerGroup={4}
                spaceBetween={24}
                breakpoints={{
                  640: { slidesPerView: 5, slidesPerGroup: 5 },
                  768: { slidesPerView: 6, slidesPerGroup: 6 },
                  1024: { slidesPerView: 8, slidesPerGroup: 8 },
                  1280: { slidesPerView: 10, slidesPerGroup: 10 },
                  1536: { slidesPerView: 14, slidesPerGroup: 14 },
                }}
              >
                {data.cast.map((member) => (
                  <SwiperSlide key={member.id}>
                    <div className="flex flex-col gap-4">
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                        <Image
                          src={
                            member.profile_path
                              ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                              : '/no-poster.jpg'
                          }
                          fill
                          sizes="112px"
                          className="object-cover object-center"
                          alt={member.name}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold leading-4 text-sm">
                          {member.name}
                        </span>
                        <span className="text-xs leading-4 line-clamp-2 text-on-surface-variant">
                          {member.character.split('/')[0]}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </section>
    </>
  );
}
