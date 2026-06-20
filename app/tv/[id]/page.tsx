interface TVPageProps {
  params: Promise<{ id: string }>;
}

export default async function TVPage({ params }: TVPageProps) {
  const { id } = await params;

  return <>TV ID: {id}</>;
}
