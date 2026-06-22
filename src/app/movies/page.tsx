import Breadcrumbs from '@/src/components/ui/Breadcrumbs';
import getMovies from '@/src/services/getMovies';
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

export default async function Movies() {
  const { data, error } = await getMovies();

  if (error) {
    return <div>{error}</div>;
  }

  const movies: Movie[] = data?.movies || [];
  console.log(movies);
  return (
    <main className="px-4">
      <Breadcrumbs />
      <section>
        <h1>Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6">
          {movies.map((movie) => (
            <article key={movie.id}>
              <a href={`/movies/${movie.id}`} alt={movie.title}>
                <img
                  className="rounded-3xl w-full aspect-[2/3] object-cover"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : '/no-poster.jpg'
                  }
                  alt={movie.title}
                />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
