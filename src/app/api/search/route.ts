import { searchMovieByName } from '@/src/services/movies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const pageParam = searchParams.get('page');

  if (!query || !query.trim()) {
    return NextResponse.json(
      { data: null, error: 'Query parameter is required and cannot be empty' },
      { status: 400 },
    );
  }

  let page = 1;
  if (pageParam) {
    if (!/^\d+$/.test(pageParam)) {
      return NextResponse.json(
        { data: null, error: 'Page parameter is required and cannot be empty' },
        { status: 400 },
      );
    }
    page = Number(pageParam);
  }

  const { data, error } = await searchMovieByName(query.trim(), page);

  if (error) {
    return NextResponse.json({ data: null, error }, { status: 500 });
  }

  return NextResponse.json({ data, error: null }, { status: 200 });
}
