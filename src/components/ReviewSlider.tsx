import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Reviews } from '../types/movies';
import { useRouter } from 'next/navigation';

import ShowMoreButton from './ui/ShowMoreButton';
import Headline from './ui/Headline';

interface ReviewSliderProps {
  reviews: Reviews;
}
export default function ReviewSlider({ reviews }: ReviewSliderProps) {
  const router = useRouter();

  return (
    <section>
      <div className="flex gap-2 items-baseline">
        <Headline as="h2" variant="h2">
          Reviews
        </Headline>
        <span className="text-xl text-on-surface-variant">
          {reviews.total_results}
        </span>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
          1536: { slidesPerView: 6 },
        }}
      >
        {reviews.results.map((review) => (
          <SwiperSlide
            key={review.id}
            className="px-6 py-6 rounded-2xl bg-surface-container"
          >
            <span className="text-sm font-bold text-on-surface-variant">
              {review.author}
            </span>
            <div className="pb-4">
              <p className="line-clamp-3">{review.content}</p>
              <ShowMoreButton onClick={() => router.push('/')} />
            </div>
            <span className="text-sm text-on-surface-variant">
              {Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).format(new Date(review.created_at))}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
