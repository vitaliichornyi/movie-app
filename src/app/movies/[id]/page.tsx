'use client';

import React, { useState } from 'react';
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
import DetailsListRow from '@/src/components/ui/DetailsListRow';
import RatingWidget from '@/src/components/ui/RatingWidget';
import CollectionsList from '@/src/components/CollectionsList';
import ShowMoreButton from '@/src/components/ui/ShowMoreButton';
import ReviewsSlider from '@/src/components/ReviewsSlider';

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

  const [isOpened, setIsOpened] = useState(false);

  console.log(data);

  return (
    <>
      {isLoading && <LoadingContainer />}

      {error && <StatusMessage type="error" />}

      {data && !isLoading && !error && (
        <article>
          {/* Hero image */}
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

              <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/50 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 via-30% to-transparent" />
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
                      {index > 0 && <span>·</span>}
                      <span>{genre.name}</span>
                    </React.Fragment>
                  ))}
                  <span>·</span>
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

          {/* Cast */}
          <section className="layout-wrap flex flex-col gap-4 py-8">
            <h2>Cast</h2>
            <div>
              <CrewSlider cast={data.credits.cast} />
            </div>
          </section>

          {/* Overview && Rating widget */}
          <section className="layout-wrap py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-8 flex-col gap-2">
                <div className="flex gap-2 flex-col w-full md:max-w-170">
                  <h2>Overview</h2>
                  <p>{data.overview}</p>
                </div>
                {isOpened && (
                  <dl className="pt-4 pb-2">
                    <DetailsListRow label="Director">
                      {data.credits.crew
                        .filter(
                          (person) =>
                            person.department === 'Directing' &&
                            person.job === 'Director',
                        )
                        .map((person, index) => (
                          <React.Fragment key={person.id}>
                            {index > 0 && <span>·</span>}
                            <span>{person.name}</span>
                          </React.Fragment>
                        ))}
                    </DetailsListRow>
                    <DetailsListRow label="Genres">
                      {data.genres.map((genre, index) => (
                        <React.Fragment key={genre.id}>
                          {index > 0 && <span>·</span>}
                          <span>{genre.name}</span>
                        </React.Fragment>
                      ))}
                    </DetailsListRow>
                    {data.release_date && (
                      <DetailsListRow label="Release date">
                        {new Date(
                          data.release_date.replace(/-/g, '/'),
                        ).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </DetailsListRow>
                    )}
                    <DetailsListRow label="Country">
                      {data.production_countries.slice(0, 2).map((country) => (
                        <CountryTag
                          key={country.iso_3166_1}
                          isoCode={country.iso_3166_1}
                        >
                          {country.name}
                        </CountryTag>
                      ))}
                    </DetailsListRow>
                    <DetailsListRow label="Budget">{`$${Intl.NumberFormat('en-US').format(data.budget)}`}</DetailsListRow>
                    <DetailsListRow label="Revenue">{`$${Intl.NumberFormat('en-US').format(data.revenue)}`}</DetailsListRow>

                    <DetailsListRow label="Runtime">{`${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`}</DetailsListRow>
                    <DetailsListRow label="Language">
                      {data.spoken_languages.map((language, index) => (
                        <React.Fragment key={language.iso_639_1}>
                          {index > 0 && <span>·</span>}
                          <span>{language.name}</span>
                        </React.Fragment>
                      ))}
                    </DetailsListRow>
                  </dl>
                )}
                <ShowMoreButton
                  isOpened={isOpened}
                  onClick={() => setIsOpened(!isOpened)}
                />
              </div>
              <div className="flex flex-4 flex-col">
                <RatingWidget
                  voteCount={Intl.NumberFormat('en-US').format(data.vote_count)}
                  voteAverage={data.vote_average.toFixed(1)}
                />
              </div>
            </div>
          </section>

          {/* Review */}
          {data.reviews.results.length > 0 && (
            <ReviewsSlider reviews={data.reviews} />
          )}

          {/* Collections  */}
          <CollectionsList />
        </article>
      )}
    </>
  );
}
