'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import Image from 'next/image';
import Link from 'next/link';

type WidthType = 92 | 154 | 185 | 342 | 500 | 780;

interface PosterImageProps {
  id: number;
  index: number;
  poster_path: string | null;
  title: string;
  width?: WidthType;
  vote_average: number;
  genre_ids: number[];
  onClick?: () => void;
}

const movieGenres = [
  { id: 28, label: 'Action' },
  { id: 12, label: 'Adventure' },
  { id: 16, label: 'Animation' },
  { id: 35, label: 'Comedy' },
  { id: 80, label: 'Crime' },
  { id: 99, label: 'Documentary' },
  { id: 18, label: 'Drama' },
  { id: 10751, label: 'Family' },
  { id: 14, label: 'Fantasy' },
  { id: 36, label: 'History' },
  { id: 27, label: 'Horror' },
  { id: 10402, label: 'Music' },
  { id: 9648, label: 'Mystery' },
  { id: 10749, label: 'Romance' },
  { id: 878, label: 'Science Fiction' },
  { id: 10770, label: 'TV Movie' },
  { id: 53, label: 'Thriller' },
  { id: 10752, label: 'War' },
  { id: 37, label: 'Western' },
];

export default function PosterImage({
  id,
  index,
  poster_path,
  title,
  width = 500,
  vote_average,
  genre_ids,
  onClick,
}: PosterImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-2/3 rounded-2xl overflow-hidden">
      <Link href={`/movies/${id}`} onClick={onClick}>
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-surface-container" />
        )}
        <motion.div
          className="absolute inset-0"
          initial="initial"
          whileHover="hover"
          variants={{ initial: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <Image
            className={`object-cover transition-opacity duration-400 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w${width}${poster_path}`
                : '/no-poster.jpg'
            }
            alt={title}
            fill
            sizes="(max-width:768px) 50vw, 20vw"
            priority={index < 4}
            onLoad={() => setIsLoaded(true)}
          />
          <motion.div
            className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 via-40% to-transparent"
            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex flex-col px-4 py-4"
            variants={{
              initial: { opacity: 0, y: 20 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <span className="text-2xl font-bold">
              {vote_average.toFixed(2)}
            </span>
            <span className="text-sm">
              {genre_ids
                .slice(0, 2)
                .map(
                  (id) => movieGenres.find((genre) => genre.id === id)?.label,
                )
                .filter(Boolean)
                .join('\u00A0· ')}
            </span>
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
}
