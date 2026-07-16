import Image from 'next/image';
import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import Tag from './ui/Tag';
import Button from './ui/Button';

import StarIcon from '../icons/StarIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import PlayIcon from '../icons/PlayIcon';

import { Genre, ProductionCountries } from '../types/movies';

interface HeroImageProps {
  title: string;
  backdrop_path: string | null;
  releaseYear?: string;
  genres: Genre[];
  vote_average: number;
  production_countries: ProductionCountries[];
}

export default function HeroImage({
  title,
  backdrop_path,
  releaseYear,
  genres,
  vote_average,
  production_countries,
}: HeroImageProps) {
  console.log(genres);

  return (
    <section className="relative flex items-end w-full min-h-150 2xl:min-h-200">
      <div className="absolute -top-(--header-height) inset-0 -z-10">
        <Image
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/original${backdrop_path}`
              : '/no-poster.jpg'
          }
          fill
          priority
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
          <Breadcrumbs dynamicTitle={title} />
          <h1 className="title-1">{title}</h1>
          <div className="flex py-2 gap-1 font-bold">
            {releaseYear && (
              <>
                <span>{releaseYear}</span>
                <span>·</span>
              </>
            )}

            {genres.length !== 0 && (
              <>
                {genres.slice(0, 2).map((genre, index) => (
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
              {vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex gap-1">
            {production_countries.slice(0, 2).map((country) => (
              <Tag key={country.iso_3166_1} isoCode={country.iso_3166_1}>
                {country.name}
              </Tag>
            ))}
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="primary" size="md">
              <PlayIcon />
              Play
            </Button>
            <Button type="secondary" size="md">
              <BookmarkIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
