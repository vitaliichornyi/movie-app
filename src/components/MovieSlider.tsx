'use client';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import PosterImage from './PosterImage';
import SliderNavButton from './ui/SliderNavButton';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number[];
}

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
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  function handleReachEnd() {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  }

  return (
    <div className="relative w-full">
      <SliderNavButton btnRef={setPrevEl} direction="prev" />
      <SliderNavButton btnRef={setNextEl} direction="next" />
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation={{
          prevEl,
          nextEl,
        }}
        freeMode={true}
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 4, slidesPerGroup: 4 },
          768: { slidesPerView: 5, slidesPerGroup: 5 },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
          1280: { slidesPerView: 7, slidesPerGroup: 7 },
          1536: { slidesPerView: 8, slidesPerGroup: 8 },
        }}
        onReachEnd={handleReachEnd}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`}>
            <PosterImage
              index={index}
              id={item.id}
              title={item.title}
              poster_path={item.poster_path}
              width={185}
              vote_average={item.vote_average}
              genre_ids={item.genre_ids}
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
