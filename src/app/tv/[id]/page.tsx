import Breadcrumbs from '@/src/components/ui/Breadcrumbs';

interface TVPageProps {
  params: Promise<{ id: string }>;
}

export default async function TVPage({ params }: TVPageProps) {
  const { id } = await params;

  return (
    <main>
      <Breadcrumbs dynamicTitle="Title" />
    </main>
  );
}
