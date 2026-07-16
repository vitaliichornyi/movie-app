'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import LoadingContainer from '@/src/components/LoadingContainer';
import StatusMessage from '@/src/components/StatusMessage';
import CrewSlider from '@/src/components/CrewSlider';

import RatingWidget from '@/src/components/RatingWidget';
import ShowMoreButton from '@/src/components/ui/ShowMoreButton';
import ReviewSlider from '@/src/components/ReviewSlider';
import RelatedMovies from '@/src/components/RelatedMovies';
import MovieCollectionGrid from '@/src/components/MovieCollectionGrid';
import Headline from '@/src/components/ui/Headline';
import HeroImage from '@/src/components/HeroImage';
import MovieInfoList, { MovieInfoItem } from '@/src/components/MovieInfoList';
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

  const [isOpened, setIsOpened] = useState(false);

  const movieInfo: MovieInfoItem[] = [
    {
      id: 1,
      label: 'Director',
      value:
        data?.credits?.crew
          ?.filter((person) => person.job === 'Director')
          ?.map((person) => person.name) || [],
    },
    {
      id: 2,
      label: 'Genres',
      value: data?.genres?.map((genre) => genre.name) || [],
    },
    {
      id: 3,
      label: 'Release date',
      value: data?.release_date
        ? new Date(data.release_date.replace(/-/g, '/')).toLocaleDateString(
            'en-US',
            {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            },
          )
        : 'Unknown',
    },
    {
      id: 4,
      label: 'Country',
      value: data?.production_countries?.map((country) => country.name) || [],
    },
    {
      id: 5,
      label: 'Budget',
      value:
        data?.budget && data?.budget !== 0
          ? data.budget.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })
          : 'Unknown',
    },
    {
      id: 6,
      label: 'Revenue',
      value:
        data?.revenue && data?.revenue !== 0
          ? data.revenue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })
          : 'Unknown',
    },
    {
      id: 7,
      label: 'Runtime',
      value: data?.runtime
        ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
        : 'Unknown',
    },
  ];

  return (
    <main>
      <>
        {isLoading && <LoadingContainer />}
        {error && <StatusMessage type="error" />}
        {data && !isLoading && !error && (
          <>
            <HeroImage
              title={data.title}
              backdrop_path={data.backdrop_path}
              releaseYear={data.release_date && data.release_date.split('-')[0]}
              genres={data.genres}
              vote_average={data.vote_average}
              production_countries={data.production_countries}
            />
            <div className="layout-wrap">
              <RelatedMovies
                movieId={data.id}
                type="recommendations"
                title="Similar movies"
              />
              <RelatedMovies
                movieId={data.id}
                type="similar"
                title="Related movies"
              />
              <section>
                <Headline as="h2" variant="h2">
                  Cast
                </Headline>
                <CrewSlider cast={data.credits.cast} />
              </section>

              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-8 flex-col gap-2">
                    <div className="w-full md:max-w-170">
                      <Headline as="h2" variant="h2">
                        Overview
                      </Headline>
                      <p>{data.overview}</p>
                    </div>
                    {isOpened && <MovieInfoList items={movieInfo} />}
                    <ShowMoreButton
                      isOpened={isOpened}
                      onClick={() => setIsOpened(!isOpened)}
                    />
                  </div>
                  <div className="flex flex-4 flex-col pt-0 md:pt-14">
                    <RatingWidget
                      voteCount={Intl.NumberFormat('en-US').format(
                        data.vote_count,
                      )}
                      voteAverage={data.vote_average.toFixed(1)}
                    />
                  </div>
                </div>
              </section>
              {data.reviews.results.length > 0 && (
                <ReviewSlider reviews={data.reviews} />
              )}
            </div>
          </>
        )}
        <MovieCollectionGrid />
      </>
    </main>
  );
}
