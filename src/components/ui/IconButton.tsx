interface IconButtonProps {
  children: React.ReactNode;
  size?: 'md' | 'sm';
  onClick: () => void;
}

export default function IconButton({
  children,
  size = 'md',
  onClick,
}: IconButtonProps) {
  return (
    <button
      className={`flex items-center justify-center text-on-surface-variant hover:text-on-surface transition cursor-pointer
      ${size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-14 h-14' : ''}
        `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
