import Breadcrumbs from '@/src/components/ui/Breadcrumbs';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  return (
    <main>
      <Breadcrumbs dynamicTitle="Title" />
    </main>
  );
}
