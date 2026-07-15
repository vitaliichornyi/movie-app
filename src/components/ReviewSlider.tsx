'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { Reviews } from '../types/movies';

import ShowMoreButton from './ui/ShowMoreButton';
import Headline from './ui/Headline';
import SliderNavButton from './ui/SliderNavButton';

interface ReviewSliderProps {
  reviews: Reviews;
}
export default function ReviewSlider({ reviews }: ReviewSliderProps) {
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [, setSwiperReady] = useState(false);

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
      <div className="relative w-full">
        <SliderNavButton btnRef={prevBtnRef} direction="prev" />
        <SliderNavButton btnRef={nextBtnRef} direction="next" />
        <Swiper
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
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1536: { slidesPerView: 6 },
          }}
        >
          {reviews.results.map((review) => (
            <SwiperSlide
              key={review.id}
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
        </Swiper>
      </div>
    </section>
  );
}
