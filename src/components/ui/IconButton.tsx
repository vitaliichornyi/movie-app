interface IconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <button
      className="flex items-center justify-center w-12 h-14 text-on-surface-variant hover:text-on-surface transition cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
