import CollectionsList from '../components/CollectionsList';
import HeroSlider from '../components/HeroSlider';

export default function Home() {
  return (
    <>
      <HeroSlider slug="hero-slider" />
      <CollectionsList />
    </>
  );
}
