import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="Movie logo"
        width={122}
        height={34}
        priority
      />
    </Link>
  );
}
