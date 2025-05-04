import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import FeaturedFoodItems from "@/components/FeaturedFood";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <FeaturedFoodItems />
      <Testimonials />
    </>
  );
}
