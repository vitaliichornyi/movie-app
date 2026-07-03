import Breadcrumbs from '@/src/components/ui/Breadcrumbs';
import getMovieDetailsById from '@/src/services/getMovieDetailsById';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const { data, error } = await getMovieDetailsById(id);

  console.log(data);
  return (
    <main>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="layout-wrap">
          <Breadcrumbs dynamicTitle={data.original_title} />
          <article>
            <h1>{data.original_title}</h1>
          </article>
        </div>
      )}
    </main>
  );
}
