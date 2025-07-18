import { ApiResponse } from "@/types/ApiResponse";
import { Category } from "@/types/foods";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = async () => {
  const response = await axios.get<ApiResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
  );
  const categories = response.data.data as Category[];
  return (
    <section className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 sm:px-[5vw]">
      <div className="w-full flex flex-col items-center mb-6 sm:mb-8">
        <div className="h-1 w-16 sm:w-20 bg-rose-500 rounded"></div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold title-font mb-2 text-rose-500">
          CATEGORIES
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4 sm:gap-6 w-full">
        {categories.map((category) => (
          <Link href={`/menu?category=${category.slug}`} key={category.slug}>
            <div className="flex flex-col items-center justify-center gap-2 p-2 hover:bg-rose-50 rounded-lg transition-all duration-300">
              <Image
                src={category.image.url}
                alt={category.name}
                width={40}
                height={40}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 sm:border-3 border-rose-500 hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <h3 className="text-center text-sm sm:text-base md:text-lg font-semibold text-gray-700">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
