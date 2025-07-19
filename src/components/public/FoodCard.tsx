import { formatCurrency, truncateDescription } from "@/lib/utils";
import { Food } from "@/types/foods";
import { Plus, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const FoodCard = ({ item }: { item: Food }) => {
  return (
    <div className=" rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
          {truncateDescription(item.description, 80)}
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
  );
};

export default FoodCard;
