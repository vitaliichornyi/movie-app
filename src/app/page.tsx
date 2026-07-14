import HeroSlider from '../components/HeroSlider';
import MovieCollectionGrid from '../components/MovieCollectionGrid';

export default function Home() {
  return (
    <main>
      <HeroSlider slug="hero-slider" />
      <MovieCollectionGrid />
    </main>
  );
}
