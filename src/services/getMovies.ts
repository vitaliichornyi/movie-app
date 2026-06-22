'use server';

export default async function getMovies() {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return { data: null, error: 'API_KEY is not configured on the server.' };
    }

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1`;
    const response = await fetch(url);

    if (!response.ok) {
      return {
        data: null,
        error: `Server responded with status ${response.status}`,
      };
    }

    const data = await response.json();

    return {
      data: { movies: data.results, totalPages: data.total_pages },
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error.';
    return { data: null, error: errorMessage };
  }
}
