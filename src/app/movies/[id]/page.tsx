'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Breadcrumbs from '@/src/components/ui/Breadcrumbs';
import LoadingContainer from '@/src/components/ui/LoadingContainer';
import StatusMessage from '@/src/components/ui/StatusMessage';
import Image from 'next/image';
import StarIcon from '@/src/icons/StarIcon';
import CountryTag from '@/src/components/ui/CountryTag';
import Button from '@/src/components/ui/Button';
import BookmarkIcon from '@/src/icons/BookmarkIcon';
import PlayIcon from '@/src/icons/PlayIcon';
import CrewSlider from '@/src/components/ui/CrewSlider';

import { MovieExtended } from '@/src/types/movies';

async function fetchMovieDetailsByID(id: string): Promise<MovieExtended> {
  const response = await fetch(`/api/movies/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }

  const { data } = await response.json();
  return data;
}

export default function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetailsByID(id),
  });

  return (
    <>
      {isLoading && <LoadingContainer />}

      {error && <StatusMessage type="error" />}

      {data && !isLoading && !error && (
        <article>
          <section className="relative flex items-end w-full min-h-150 2xl:min-h-200">
            <div className="absolute -top-(--header-height) inset-0 -z-10">
              <Image
                src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                fill
                priority
                unoptimized
                alt={data.title}
                className="object-cover object-center"
              />

              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 via-30% to-transparent" />
            </div>

            <div className="layout-wrap pb-10">
              <div className="flex flex-col items-center">
                <Breadcrumbs dynamicTitle={data.title} />
                <h1 className="title-1">{data.title}</h1>
                <div className="flex py-2 gap-1 font-bold">
                  {data.release_date && (
                    <span>{data.release_date.split('-')[0]}</span>
                  )}
                  <span>·</span>
                  {data.genres.slice(0, 2).map((genre, index) => (
                    <React.Fragment key={genre.id}>
                      <span>{genre.name}</span>
                      {index < 1 && <span>·</span>}
                    </React.Fragment>
                  ))}
                  <span className="flex gap-1">
                    <StarIcon />
                    {data.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="flex gap-1">
                  {data.production_countries.slice(0, 2).map((country) => (
                    <CountryTag
                      key={country.iso_3166_1}
                      isoCode={country.iso_3166_1}
                    >
                      {country.name}
                    </CountryTag>
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
          <section className="layout-wrap flex flex-col gap-4 py-4">
            <h2>Cast</h2>
            <div>
              <CrewSlider cast={data.credits.cast} />
            </div>
          </section>
          <section className="layout-wrap py-4">
            <div className="flex flex-col gap-2 w-full max-w-200 px-6 pb-6 pt-5 rounded-2xl bg-surface-container">
              <h3>Overview</h3>
              <p>{data.overview}</p>
            </div>
          </section>
        </article>
      )}
    </>
  );
}
