import { MovieExtended } from '../types/movies';
import { ServiceResult } from '../types/services';

export default async function getMovieDetailsById(
  id: number,
): Promise<ServiceResult<MovieExtended>> {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return {
        data: null,
        error: 'API_KEY is not configured on the server.',
      };
    }

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`;
    const response = await fetch(url);

    if (!response.ok) {
      return {
        data: null,
        error: `Server responded with status ${response.status}`,
      };
    }

    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error';
    return { data: null, error: errorMessage };
  }
}
