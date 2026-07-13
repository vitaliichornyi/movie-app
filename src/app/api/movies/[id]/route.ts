import { NextRequest, NextResponse } from 'next/server';

import { getMovieDetailsById } from '@/src/services/movies';

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      { data: null, error: 'Invalid ID format' },
      { status: 400 },
    );
  }

  const { data, error } = await getMovieDetailsById(parseInt(id));

  if (error) {
    const isNotFound = error.includes('404');
    return NextResponse.json(
      { data: null, error },
      { status: isNotFound ? 404 : 500 },
    );
  }

  return NextResponse.json({ data, error: null }, { status: 200 });
}
