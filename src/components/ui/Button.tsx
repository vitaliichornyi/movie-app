import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type: 'primary' | 'secondary';
  size: 'sm' | 'lg' | 'md';
  maxWidth?: boolean;
  rounded?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const sizeStyles = {
  sm: 'rounded-xl h-10 px-3',
  md: 'rounded-2xl h-12 px-4',
  lg: 'rounded-2xl h-14 px-6',
};

const typeStyle = {
  primary: ' bg-primary hover:bg-primary-hover',
  secondary: 'bg-secondary hover:bg-secondary-hover backdrop-blur-xs',
};

export default function Button({
  children,
  type,
  size,
  maxWidth,
  rounded,
  onClick,
  isLoading,
  isDisabled,
}: ButtonProps) {
  const hasMultipleChildren = React.Children.count(children) > 1;
  return (
    <button
      className={`flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none transition cursor-pointer font-medium
        ${hasMultipleChildren ? 'pl-3 pr-5 gap-0' : ''}
        ${maxWidth ? 'w-full' : 'w-auto'}
        ${rounded ? 'rounded-full' : ''} 
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
