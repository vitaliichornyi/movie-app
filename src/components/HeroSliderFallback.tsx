import Image from 'next/image';
import Headline from './ui/Headline';
import Button from './ui/Button';

const baseStyles =
  'relative w-full h-full max-w-100 md:max-w-180 lg:max-w-240 rounded-2xl overflow-hidden shrink-0';

export default function HeroSliderFallback() {
  return (
    <div className="w-full h-140 flex justify-center gap-6 overflow-hidden pb-10 select-none">
      <div className={`${baseStyles} bg-surface-container`}></div>
      <div className={`${baseStyles} `}>
        <div className={`absolute inset-0 -z-10`}>
          <Image
            src={'/hs-fallback.jpg'}
            fill
            priority
            unoptimized
            alt="Default"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/64 via-40% to-black/20" />
        </div>
        <div className="layout-wrap flex flex-col items-center justify-end w-full h-full pb-10">
          <Headline as="h1" variant="title2">
            Ready to Start Watching?
          </Headline>
          <p className="text-center text-lg font-medium">
            Sign up in to save movies to your watchlist, track your history, and
            get personalized recommendations.
          </p>
          <div className="flex gap-2 pt-6">
            <Button type="primary" size="md">
              Sign up for free
            </Button>
            <Button type="secondary" size="md">
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className={`${baseStyles} bg-surface-container`}></div>
    </div>
  );
}
