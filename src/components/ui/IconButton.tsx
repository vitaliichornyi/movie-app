import { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <button
      className="p-2 rounded-lg hover:bg-secondary-hover transition cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
