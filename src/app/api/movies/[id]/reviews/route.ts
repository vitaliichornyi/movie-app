import { getReviewsByMovieId } from '@/src/services/movies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      { data: null, error: 'Invalid ID format' },
      { status: 400 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) | 1;

  const { data, error } = await getReviewsByMovieId(Number(id), Number(page));
  if (error) {
    const isNotFound = error.includes('404');
    return NextResponse.json(
      { data: null, error },
      { status: isNotFound ? 404 : 500 },
    );
  }

  return NextResponse.json({ data, error: null }, { status: 200 });
}
