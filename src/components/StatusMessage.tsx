import Headline from './ui/Headline';

type StatusMessageType = 'empty' | 'error';

interface StatusMessageProps {
  type: StatusMessageType;
  title?: string;
  message?: string;
}

const defaults = {
  empty: {
    title: 'No results found',
    message:
      "We couldn't find any data matching your request. Try adjusting your filters or search again later.",
  },
  error: {
    title: 'Something went wrong',
    message:
      'An error occurred while fetching data from the server. Please check your internet connection or try refreshing the page.',
  },
} satisfies Record<StatusMessageType, { title: string; message: string }>;

export default function StatusMessage({
  type,
  title,
  message,
}: StatusMessageProps) {
  const { title: defaultTitle, message: defaultMessage } = defaults[type];

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full max-w-140 h-full min-h-100 text-center">
      <Headline as="h3" variant="h3">
        {title ?? defaultTitle}
      </Headline>
      <p className="text-on-surface-variant">{message ?? defaultMessage}</p>
    </div>
  );
}
