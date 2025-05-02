import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import PopularFoodItems from "@/components/PopularFood";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <PopularFoodItems />
      <Testimonials />
    </>
  );
}
