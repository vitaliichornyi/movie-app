'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SliderNavButton from './ui/SliderNavButton';

import { MovieExtended } from '../types/movies';

import HeroSliderSkeleton from './skeletons/HeroSliderSkeleton';
import StatusMessage from './StatusMessage';
import Headline from './ui/Headline';
import Tag from './ui/Tag';
import Button from './ui/Button';
import StarIcon from '../icons/StarIcon';
import PlayIcon from '../icons/PlayIcon';
import BookmarkIcon from '../icons/BookmarkIcon';

async function fetchCollection(slug: string): Promise<MovieExtended[]> {
  const response = await fetch(`/api/collections/${slug}`);
  const { data, error } = await response.json();
  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }
  return data;
}

export default function HeroSlider({ slug }: { slug: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hero-slider', slug],
    queryFn: () => fetchCollection(slug),
  });

  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const hasData = data && data.length > 0;
  const isReady = !isLoading && !error;

  return (
    <section>
      {isLoading && <HeroSliderSkeleton />}
      {error && <StatusMessage type="error" />}
      {isReady && !hasData && <StatusMessage type="empty" />}
      {isReady && hasData && (
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
            slidesPerView={'auto'}
            spaceBetween={24}
            loop={true}
            centeredSlides={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
          >
            {data.map((slide, index) => (
              <SwiperSlide
                key={slide.id}
                className="relative max-w-100 md:max-w-180 lg:max-w-240"
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden -z-20">
                  <Image
                    className="object-cover object-center -z-10"
                    src={
                      slide.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${slide.backdrop_path}`
                        : '/no-poster.jpg'
                    }
                    fill
                    priority={index === 0}
                    unoptimized
                    alt={slide.title}
                  />
                  {slide.backdrop_path && (
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 via-40% to-transparent" />
                  )}
                </div>
                <div className="flex items-end h-full w-full px-6 pb-6">
                  <div className="flex flex-col items-center w-full">
                    <Headline as="h2" variant="title2">
                      {slide.title}
                    </Headline>
                    <div className="flex gap-1 pt-2 pb-4 font-bold">
                      {slide.release_date && (
                        <>
                          <span>{slide.release_date.split('-')[0]}</span>
                          <span>·</span>
                        </>
                      )}
                      {slide.genres.length > 0 && (
                        <>
                          {slide.genres.slice(0, 2).map((genre, index) => (
                            <React.Fragment key={genre.id}>
                              {index > 0 && <span>·</span>}
                              <span>{genre.name}</span>
                            </React.Fragment>
                          ))}
                          <span>·</span>
                        </>
                      )}
                      <span className="flex gap-1">
                        <StarIcon />
                        {slide.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {slide.production_countries.slice(0, 2).map((country) => (
                        <Tag
                          key={country.iso_3166_1}
                          isoCode={country.iso_3166_1}
                        >
                          {country.name}
                        </Tag>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-6">
                      <Button type="primary" size="md">
                        <PlayIcon />
                        Start watching
                      </Button>
                      <Button type="secondary" size="md">
                        <BookmarkIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
