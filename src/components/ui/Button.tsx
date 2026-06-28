interface ButtonProps {
  type: 'primary' | 'secondary';
  size: 'sm' | 'lg';
  maxWidth?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const sizeStyles = {
  sm: 'rounded-xl h-10 px-3',
  lg: 'rounded-2xl h-14 px-6',
};

const typeStyle = {
  primary: ' bg-primary hover:bg-primary-hover',
  secondary: 'bg-secondary hover:bg-secondary-hover',
};

export default function Button({
  children,
  onClick,
  isLoading,
  isDisabled,
  type,
  size,
  maxWidth,
}: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none transition cursor-pointer
        ${maxWidth ? 'w-full' : 'w-auto'} 
        ${sizeStyles[size]} 
        ${typeStyle[type]} 
        `}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <>
          <div className="animate-spin h-5 w-5 rounded-full border-2 border-current border-t-transparent" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
