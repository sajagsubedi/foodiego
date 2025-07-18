// components/FeaturedFoodItems.tsx

import Image from "next/image";
import { Plus, Star } from "lucide-react";
import { Food } from "@/types/foods";
import { ApiResponse } from "@/types/ApiResponse";
import { formatCurrency } from "@/lib/utils";
import axios from "axios";

const FeaturedFoodItems: React.FC = async () => {
  const truncateDescription = (
    description: string,
    maxLength: number
  ): string => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength - 3) + "...";
  };

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
          <div
            key={item._id || index}
            className=" rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-auto">
              <Image
                src={item.image.url}
                alt={item.name}
                width={500}
                height={300}
                className="object-cover w-full h-48"
              />
              <button className="absolute bottom-2 right-2 bg-rose-500 text-white font-semibold p-2 rounded-full hover:bg-rose-600 transition-colors duration-300">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <div className="flex items-center justify-center mb-2 text-rose-500">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    fill={index < Math.floor(4.5) ? "currentColor" : "none"}
                    size={16}
                  />
                ))}
                <span className="ml-1 text-gray-600">4.5</span>
              </div>
              <p className="text-gray-600 mb-4 text-nowrap">
                {truncateDescription(item.description, 40)}
              </p>
              <div className="flex justify-center gap-2 items-center">
                <p className="text-gray-600 font-semibold line-through h-full text-lg flex items-center justify-center">
                  {item.markedPrice && formatCurrency(item.markedPrice)}
                </p>
                <h4 className="font-bold text-2xl text-rose-700">
                  {formatCurrency(item.price)}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFoodItems;
