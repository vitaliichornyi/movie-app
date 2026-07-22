import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MovieExtended } from '../types/movies';

import Headline from './ui/Headline';
import MovieInfoList, { MovieInfoItem } from './MovieInfoList';
import ShowMoreButton from './ui/ShowMoreButton';
import RatingWidget from './RatingWidget';

interface MovieSummary {
  data: MovieExtended;
}

export default function MovieSummary({ data }: MovieSummary) {
  const [isOpened, setIsOpened] = useState(false);

  const movieInfo: MovieInfoItem[] = [
    {
      id: 1,
      label: 'Genres',
      value:
        data?.genres && data.genres.length > 0
          ? data.genres.map((genre) => genre.name)
          : null,
    },
    {
      id: 2,
      label: 'Release date',
      value: (() => {
        if (!data?.release_date) return null;
        const date = new Date(data.release_date.replace(/-/g, '/'));
        if (isNaN(date.getTime())) return null;
        return date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      })(),
    },
    {
      id: 3,
      label: 'Country',
      value:
        data?.production_countries && data.production_countries.length > 0
          ? data?.production_countries?.map((country) => country.name)
          : null,
    },
    {
      id: 4,
      label: 'Budget',
      value:
        data?.budget && data?.budget > 0
          ? data.budget.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })
          : null,
    },
    {
      id: 5,
      label: 'Revenue',
      value:
        data?.revenue && data?.revenue > 0
          ? data.revenue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })
          : null,
    },
    {
      id: 6,
      label: 'Runtime',
      value: data?.runtime
        ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
        : null,
    },
  ];

  const hasMovieInfo = movieInfo.some((item) => item.value !== null);

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-8 flex-col gap-2">
          <div className="w-full md:max-w-170">
            <Headline as="h2" variant="h2">
              Overview
            </Headline>
            <p>
              {data.overview?.trim() ||
                'There is no description for this movie yet.'}
            </p>
          </div>

          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <MovieInfoList items={movieInfo} />
              </motion.div>
            )}
          </AnimatePresence>
          {hasMovieInfo && (
            <ShowMoreButton
              isOpened={isOpened}
              onClick={() => setIsOpened(!isOpened)}
            />
          )}
        </div>
        <div className="flex flex-4 flex-col pt-0 md:pt-14">
          <RatingWidget
            voteCount={Intl.NumberFormat('en-US').format(data.vote_count)}
            voteAverage={data.vote_average.toFixed(1)}
          />
        </div>
      </div>
    </section>
  );
}
