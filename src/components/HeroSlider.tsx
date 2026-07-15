'use client';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import HeroSliderSkeleton from './skeletons/HeroSliderSkeleton';
import StatusMessage from './StatusMessage';
import SliderNavButton from './ui/SliderNavButton';

import { Movie } from '../types/movies';

async function fetchCollection(slug: string): Promise<Movie[]> {
  const response = await fetch(`/api/collections/${slug}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }

  const { data } = await response.json();
  return data;
}

export default function HeroSlider({ slug }: { slug: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hero-slider', slug],
    queryFn: () => fetchCollection(slug),
  });

  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const hasData = data && data.length > 0;
  const isReady = !isLoading && !error;

  return (
    <section>
      {isLoading && <HeroSliderSkeleton />}
      {error && <StatusMessage type="error" />}
      {isReady && !hasData && <StatusMessage type="empty" />}
      {isReady && hasData && (
        <div className="relative w-full">
          <SliderNavButton btnRef={prevBtnRef} direction="prev" heroSlider />
          <SliderNavButton btnRef={nextBtnRef} direction="next" heroSlider />
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
              prevEl: prevBtnRef.current,
              nextEl: nextBtnRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== 'object') return;
              swiper.params.navigation.prevEl = prevBtnRef.current;
              swiper.params.navigation.nextEl = nextBtnRef.current;
            }}
            slidesPerView={'auto'}
            spaceBetween={24}
            loop={true}
            centeredSlides={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
          >
            {data.map((slide) => (
              <SwiperSlide
                key={slide.id}
                className={`w-full h-full max-w-100 md:max-w-180 lg:max-w-240 flex`}
              >
                <img
                  className="h-full w-full object-cover rounded-2xl"
                  src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                  alt={slide.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
