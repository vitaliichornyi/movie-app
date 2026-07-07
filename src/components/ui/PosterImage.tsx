import Image from 'next/image';
import Link from 'next/link';

type WidthType = 92 | 154 | 185 | 342 | 500 | 780;

interface PosterImageParam {
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
}: PosterImageParam) {
  const height = Math.round(width * 1.5);
  return (
    <Link href={`/movies/${id}`}>
      <Image
        className="h-auto w-full aspect-2/3 object-cover rounded-2xl"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w${width}${poster_path}`
            : '/no-poster.jpg'
        }
        alt={title}
        width={width}
        height={height}
        priority={index < 10}
      />
    </Link>
  );
}
