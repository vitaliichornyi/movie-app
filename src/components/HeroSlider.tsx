'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SliderNavButton from './ui/SliderNavButton';

import { MovieExtended } from '../types/movies';

import HeroSliderSkeleton from './skeletons/HeroSliderSkeleton';
import HeroImage from './HeroImage';
import HeroSliderFallback from './HeroSliderFallback';

async function fetchCollection(slug: string): Promise<MovieExtended[]> {
  const response = await fetch(`/api/collections/${slug}`);
  const { data, error } = await response.json();
  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }
  return data;
}

export default function HeroSlider({ slug }: { slug: string }) {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ['hero-slider', slug],
    queryFn: () => fetchCollection(slug),
  });

  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const hasData = data && data.length > 0;
  const hasNoData = isError || (isSuccess && !hasData);

  return (
    <section>
      {isPending && <HeroSliderSkeleton />}
      {hasNoData && <HeroSliderFallback />}
      {hasData && (
        <div className="relative w-full">
          <SliderNavButton btnRef={setPrevEl} direction="prev" heroSlider />
          <SliderNavButton btnRef={setNextEl} direction="next" heroSlider />
          <Swiper
            className="w-full h-140 [&_.swiper-slide]:opacity-40 [&_.swiper-slide]:transition-opacity [&_.swiper-slide-active]:opacity-100"
            style={
              {
                paddingBottom: '40px',
                '--swiper-pagination-color': '#FFFFFF',
                '--swiper-pagination-bullet-inactive-color': '#FFFFFF',
                '--swiper-pagination-bullet-inactive-opacity': '0.16',
              } as React.CSSProperties
            }
            modules={[Pagination, Autoplay, Navigation]}
            navigation={{
              prevEl,
              nextEl,
            }}
            slidesPerView={hasNoData ? 1 : 'auto'}
            spaceBetween={24}
            loop={true}
            centeredSlides={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
          >
            {data.map((slide, index) => (
              <SwiperSlide
                key={slide.id}
                className="max-w-100 md:max-w-180 lg:max-w-240 2xl:max-w-7xl rounded-2xl overflow-hidden"
              >
                <HeroImage
                  title={slide.title}
                  backdrop_path={slide.backdrop_path}
                  genres={slide.genres}
                  vote_average={slide.vote_average}
                  production_countries={slide.production_countries}
                  releaseDate={slide.release_date}
                  heroSlider
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
