import Link from 'next/link';

const footerNav = [
  {
    id: 1,
    title: 'Browse',
    links: [
      { id: '1-1', label: 'Popular Movies', href: '/' },
      { id: '1-2', label: 'New Releases', href: '/' },
      { id: '1-3', label: 'Animation & Family', href: '/' },
      { id: '1-4', label: 'Curated Collections', href: '/' },
    ],
  },
  {
    id: 2,
    title: 'Shop',
    links: [
      { id: '2-1', label: 'Plans & Pricing', href: '/' },
      { id: '2-2', label: 'Deals & Promo Codes', href: '/' },
      { id: '2-3', label: 'Gift Cards', href: '/' },
      { id: '2-4', label: 'Payment Methods', href: '/' },
    ],
  },
  {
    id: 3,
    title: 'Support',
    links: [
      { id: '3-1', label: 'FAQs', href: '/' },
      { id: '3-2', label: 'Help Center', href: '/' },
      { id: '3-3', label: 'Supported Devices', href: '/' },
    ],
  },
  {
    id: 4,
    title: 'Company',
    links: [
      { id: '4-1', label: 'About Us', href: '/' },
      { id: '4-2', label: 'Careers', href: '/' },
      { id: '4-3', label: 'Terms of Service', href: '/' },
      { id: '4-4', label: 'Privacy Policy', href: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="layout-wrap grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 pb-32 pt-24">
      {footerNav.map((item) => (
        <nav key={item.id} className="flex flex-col gap-2">
          <h5 className="font-medium">{item.title}</h5>
          <ul className="flex flex-col gap-1">
            {item.links.map((link) => (
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
        </nav>
      ))}
    </footer>
  );
}
