import Link from 'next/link';

interface FooterLink {
  id: string;
  label: string;
  href: string;
}
interface FooterNavProps {
  title: string;
  links: FooterLink[];
}

export default function FooterNav({ title, links }: FooterNavProps) {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="font-medium">{title}</h5>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className="text-sm text-on-surface-variant hover:text-on-surface transition"
              href={link.href}
              prefetch={false}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
