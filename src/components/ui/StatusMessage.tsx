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
    <div className="flex items-center justify-center w-full h-140">
      <div className="max-w-180 text-center">
        <h2>{title ?? defaultTitle}</h2>
        <p>{message ?? defaultMessage}</p>
      </div>
    </div>
  );
}
