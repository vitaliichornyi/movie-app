import HeroSlider from '../components/HeroSlider';
import MovieCollectionGrid from '../components/MovieCollectionGrid';

export default function Home() {
  return (
    <main className="grow">
      <HeroSlider slug="hero-slider" />
      <MovieCollectionGrid />
    </main>
  );
}
