import { NextRequest, NextResponse } from 'next/server';
import {
  getAllCollectionItemsBySlug,
  getCollectionItemsPageBySlug,
} from '@/src/services/getCollectionItems';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  if (page !== null || limit !== null) {
    const params = {
      slug: slug,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    };

    const { data, isLastPage, error } =
      await getCollectionItemsPageBySlug(params);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data, isLastPage });
  } else {
    const { data, error } = await getAllCollectionItemsBySlug({ slug });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  }
}
