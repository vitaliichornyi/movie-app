import Button from './ui/Button';

interface RatingWidgetProps {
  voteCount: string;
  voteAverage: string;
}

function getRatingVerdict(rating: number): string {
  if (rating == 0.0) return 'No ratings yet';
  if (rating >= 8.5) return 'Masterpiece';
  if (rating >= 7.0) return 'Good movie';
  if (rating >= 5.5) return 'Not bad';
  if (rating >= 4.0) return 'Boring';
  return 'Waste of time';
}

export default function RatingWidget({
  voteCount,
  voteAverage,
}: RatingWidgetProps) {
  return (
    <div className="flex flex-row md:flex-col gap-6 px-6 pt-6 md:pt-5 pb-6 rounded-2xl bg-surface-container">
      <div className="flex flex-4 md:flex-auto items-center gap-4">
        <span className="text-4xl font-bold tracking-tighter">
          {voteAverage}
        </span>
        <div>
          <span>{getRatingVerdict(parseFloat(voteAverage))}</span>
          <p className="flex gap-1 text-sm text-on-surface-variant">
            <span>{voteCount}</span>
            <span>Ratings</span>
          </p>
        </div>
      </div>
      <div className="flex flex-2 md:flex-auto">
        <Button type="secondary" size="md" maxWidth>
          Rate
        </Button>
      </div>
    </div>
  );
}
