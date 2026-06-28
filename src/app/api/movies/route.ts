import { NextRequest, NextResponse } from 'next/server';
import getMovies from '@/src/services/getMovies';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params = {
    with_genres: searchParams.get('with_genres') || undefined,
    with_origin_country: searchParams.get('with_origin_country') || undefined,
    primary_release_year: searchParams.get('primary_release_year') || undefined,
    vote_average: searchParams.get('vote_average')
      ? Number(searchParams.get('vote_average'))
      : undefined,
    page: searchParams.get('page')
      ? Number(searchParams.get('page'))
      : undefined,
    sort_by: searchParams.get('sort_by') || undefined,
  };

  const response = await getMovies(params);

  if (response.error) {
    return NextResponse.json({ error: response.error }, { status: 500 });
  }

  return NextResponse.json(response.data);
}
