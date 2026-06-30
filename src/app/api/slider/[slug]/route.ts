import { NextResponse } from 'next/server';
import getSliderBySlug from '@/src/services/getSliderBySlug';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const response = await getSliderBySlug(slug);

  if (response.error) {
    return NextResponse.json({ error: response.error }, { status: 500 });
  }

  return NextResponse.json(response.data);
}
