import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md';
}

export default function Logo({ size = 'md' }: LogoProps) {
  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="Movie logo"
        width={size === 'md' ? 128 : size === 'sm' ? '110' : '124'}
        height={34}
        priority
      />
    </Link>
  );
}
