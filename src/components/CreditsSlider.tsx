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
import LoadingContainer from './LoadingContainer';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

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

  const { data, isLoading, error } = useQuery({
    queryKey: ['credits', movieId],
    queryFn: () => fetchCredits(movieId),
    enabled: shouldLoad,
  });

  const isReady = shouldLoad && !isLoading && !error;
  const hasCredits = data?.cast && data.cast.length > 0;

  useEffect(() => {
    if (error) {
      console.error(
        `[CreditsSlider] Failed to load credits for movie ID ${movieId}:`,
        error,
      );
    }
  }, [error]);

  useEffect(() => {
    if (isReady && !hasCredits) {
      console.warn(
        `[CreditsSlider] Empty cast/crew array returned for movie ID ${movieId}`,
      );
    }
  }, [isReady, hasCredits]);

  return (
    <section
      ref={triggerRef}
      className={isReady && !hasCredits ? 'hidden' : ''}
    >
      {isLoading && <LoadingContainer />}
      {isReady && hasCredits && (
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
              slidesPerView={'auto'}
              spaceBetween={24}
              watchSlidesProgress={true}
            >
              {data.cast.map((member) => (
                <SwiperSlide key={member.id} className="w-auto!">
                  <div className="flex flex-col gap-3 w-28">
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden">
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
                      <span className="text-xs leading-4 text-on-surface-variant">
                        {member.character}
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
  );
}
