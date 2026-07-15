'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import SliderNavButton from './ui/SliderNavButton';

import { Cast } from '@/src/types/movies';

interface CrewSliderProps {
  cast: Cast[];
}

export default function CrewSlider({ cast }: CrewSliderProps) {
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [, setSwiperReady] = useState(false);

  return (
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
        slidesPerView={'auto'}
        spaceBetween={24}
        watchSlidesProgress={true}
      >
        {cast.map((member) => (
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
  );
}
