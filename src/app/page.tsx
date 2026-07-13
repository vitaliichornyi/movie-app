import MovieCollections from '../components/MovieCollections';
import HeroSlider from '../components/HeroSlider';

export default function Home() {
  return (
    <>
      <HeroSlider slug="hero-slider" />
      <MovieCollections />
    </>
  );
}
