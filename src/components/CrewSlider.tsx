'use client';
import { useState } from 'react';
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
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
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
