import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import PopularFoodItems from "@/components/PopularFood";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <PopularFoodItems/>
    </>
  );
}
