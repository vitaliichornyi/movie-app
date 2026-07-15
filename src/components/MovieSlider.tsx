'use client';
import { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import PosterImage from './PosterImage';
import SliderNavButton from './ui/SliderNavButton';

import { Movie } from '../types/movies';

interface MovieSliderProps {
  items: Movie[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
export default function MovieSlider({
  items,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: MovieSliderProps) {
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [, setSwiperReady] = useState(false);

  function handleReachEnd() {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  }

  return (
    <div className="relative w-full">
      <SliderNavButton btnRef={prevBtnRef} direction="prev" />
      <SliderNavButton btnRef={nextBtnRef} direction="next" />
      <Swiper
        className="min-w-0"
        modules={[Navigation, FreeMode]}
        navigation={{
          prevEl: prevBtnRef.current,
          nextEl: nextBtnRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== 'object') return;
          swiper.params.navigation.prevEl = prevBtnRef.current;
          swiper.params.navigation.nextEl = nextBtnRef.current;
        }}
        onInit={() => setSwiperReady(true)}
        freeMode={true}
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
        {items.map((item, index) => (
          <SwiperSlide key={item.id}>
            <PosterImage
              index={index}
              id={item.id}
              title={item.title}
              poster_path={item.poster_path}
              width={185}
            />
          </SwiperSlide>
        ))}
        {isFetchingNextPage && (
          <SwiperSlide key="next-page-loader">
            <div className="flex items-center justify-center w-full aspect-2/3 rounded-2xl">
              <div className="animate-spin h-5 w-5 rounded-full border-2 border-current border-t-transparent" />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
