import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import PosterImage from './ui/PosterImage';

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
  function handleReachEnd() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  return (
    <div>
      <Swiper
        className="flex-1 min-w-0"
        modules={[FreeMode]}
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
          <SwiperSlide key={`next-page-loader`}>
            <div className="flex items-center justify-center w-full aspect-2/3 rounded-2xl">
              <div className="animate-spin h-5 w-5 rounded-full border-2 border-current border-t-transparent" />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
