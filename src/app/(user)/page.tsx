import Categories from "@/components/public/Categories";
import HeroSection from "@/components/public/HeroSection";
import FeaturedFoodItems from "@/components/public/FeaturedFood";
import Testimonials from "@/components/public/Testimonials";

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
