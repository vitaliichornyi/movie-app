import Image from 'next/image';
import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import Tag from './ui/Tag';
import Button from './ui/Button';

import StarIcon from '../icons/StarIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import PlayIcon from '../icons/PlayIcon';

import { Genre, ProductionCountries } from '../types/movies';
import Headline from './ui/Headline';

interface HeroImageProps {
  title: string;
  backdrop_path: string | null;
  releaseDate?: string;
  genres: Genre[];
  vote_average: number;
  production_countries: ProductionCountries[];
  heroSlider?: boolean;
  index?: number;
}

export default function HeroImage({
  title,
  backdrop_path,
  releaseDate,
  genres,
  vote_average,
  production_countries,
  heroSlider = false,
  index = 0,
}: HeroImageProps) {
  return (
    <div
      className={`relative flex items-end w-full ${heroSlider ? 'h-full' : 'min-h-150 2xl:min-h-200'}`}
    >
      <div
        className={`absolute inset-0 ${!heroSlider ? '-top-(--header-height)' : ''} -z-10`}
      >
        <Image
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/original${backdrop_path}`
              : '/no-poster.jpg'
          }
          fill
          priority={index === 0}
          unoptimized
          alt={title}
          className="object-cover object-center"
        />
        {backdrop_path && (
          <>
            <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/50 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 via-30% to-transparent" />
          </>
        )}
      </div>
      <div className="layout-wrap pb-10">
        <div className="flex flex-col items-center">
          {!heroSlider && (
            <Breadcrumbs dynamicTitle={title} className="justify-center" />
          )}
          <Headline
            as={heroSlider ? 'h2' : 'h1'}
            variant={heroSlider ? 'title2' : 'title1'}
          >
            {title}
          </Headline>
          <div className="flex items-center justify-center gap-1 w-full min-w-0 pb-4 font-bold">
            {releaseDate && (
              <>
                <span className="shrink-0">{releaseDate.split('-')[0]}</span>
                <span className="shrink-0">·</span>
              </>
            )}
            {genres.length > 0 && (
              <>
                {genres.slice(0, 2).map((genre, index) => (
                  <React.Fragment key={genre.id}>
                    {index > 0 && <span className="shrink-0">·</span>}
                    <span className="truncate">{genre.name}</span>
                  </React.Fragment>
                ))}
                <span>·</span>
              </>
            )}
            <span className="flex gap-1 shrink-0">
              <StarIcon />
              {vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-center w-full min-w-0 gap-1">
            {production_countries.slice(0, 2).map((country) => (
              <Tag key={country.iso_3166_1} isoCode={country.iso_3166_1}>
                {country.name}
              </Tag>
            ))}
          </div>
          <div className="flex gap-2 pt-6">
            <Button type="primary" size="md">
              <PlayIcon />
              Watch now
            </Button>
            <Button type="secondary" size="md">
              <BookmarkIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
