import FooterNav from './ui/FooterNav';

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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 px-6 md:px-12 pb-32">
      {footerNav.map((item) => (
        <FooterNav title={item.title} links={item.links} key={item.id} />
      ))}
    </div>
  );
}
