'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type WidthType = 92 | 154 | 185 | 342 | 500 | 780;

interface PosterImageProps {
  id: number;
  index: number;
  poster_path: string | null;
  title: string;
  width?: WidthType;
}

export default function PosterImage({
  id,
  index,
  poster_path,
  title,
  width = 500,
}: PosterImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link
      href={`/movies/${id}`}
      className="relative block aspect-2/3 rounded-2xl overflow-hidden"
    >
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-surface-container" />
      )}
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
        priority={index < 10}
        onLoad={() => setIsLoaded(true)}
      />
    </Link>
  );
}
