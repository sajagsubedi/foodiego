import { Food } from "@/types/foods";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import FoodCard from "./FoodCard";

const FeaturedFoodItems: React.FC = async () => {
  const response = await axios.get<ApiResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/foods/featured`
  );
  const foodItems = response.data.data as Food[];

  return (
    <section className="flex flex-col items-center justify-center py-10 mt-10 px-[5vw]">
      <div className=" w-full mb-5 flex flex-col items-center">
        <div className="h-1 w-20 bg-rose-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-rose-500 ">
          FEATURED FOODS
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foodItems.map((item, index) => (
          <FoodCard item={item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedFoodItems;
