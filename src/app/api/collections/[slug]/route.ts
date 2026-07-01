import { NextResponse } from 'next/server';
import getCollectionItemsBySlug from '@/src/services/getCollectionItemsBySlug';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const response = await getCollectionItemsBySlug(slug);

  if (response.error) {
    return NextResponse.json({ error: response.error }, { status: 500 });
  }

  return NextResponse.json(response.data);
}
