'use server';

export default async function getMovieDetailsById(id: string) {
  try {
    if (!id) {
      return {
        data: null,
        error: 'Movie ID is required and cannot be empty.',
      };
    }
    const cleanId = id.trim();

    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return {
        data: null,
        error: 'API_KEY is not configured on the server.',
      };
    }

    const url = `https://api.themoviedb.org/3/movie/${cleanId}?api_key=${apiKey}&language=en-US&append_to_response=credits,reviews`;
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
