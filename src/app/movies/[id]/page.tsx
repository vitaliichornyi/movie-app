import Breadcrumbs from '@/src/components/ui/Breadcrumbs';
import getMovieDetailsById from '@/src/services/getMovieDetailsById';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const { data, error } = await getMovieDetailsById(id);

  console.log(data);
  return error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Breadcrumbs dynamicTitle={data.original_title} />
    </div>
  );
}
