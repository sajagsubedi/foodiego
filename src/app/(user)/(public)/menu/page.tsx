"use client";

import { ApiResponse } from "@/types/ApiResponse";
import { Category } from "@/types/foods";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function MenuPage() {
  return (
    <section className="flex flex-col items-center justify-center py-10 px-[5vw]">
      <div className="w-full lg:mb-0 flex flex-col items-center">
        <div className="h-1 w-20 bg-rose-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-rose-500">
          Menu
        </h2>
      </div>
      <Suspense fallback={<div>Loading menu categories...</div>}>
        <MenuContent />
      </Suspense>
    </section>
  );
}

function MenuContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
      );
      setCategories(response.data.data as Category[]);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data?.message || "Error fetching categories.";
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section>
      <div className="flex gap-4 mt-10 justify-around">
        <Link href={`/menu`}>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src={"/assets/allfood.jpg"}
              alt={"All"}
              width={40}
              height={40}
              className={`w-32 h-32 rounded-full ${
                !currentCategory ? "border-4 border-rose-500" : ""
              } hover:scale-105 transition-all duration-300 ease-in-out`}
            />
            <h3 className="text-center text-lg font-semibold text-gray-700">
              All
            </h3>
          </div>
        </Link>
        {categories.map((category) => (
          <Link href={`/menu?category=${category.slug}`} key={category.slug}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Image
                src={category.image.url}
                alt={category.name}
                width={40}
                height={40}
                className={`w-32 h-32 rounded-full ${
                  currentCategory === category.slug
                    ? "border-4 border-rose-500"
                    : ""
                } hover:scale-105 transition-all duration-300 ease-in-out`}
              />
              <h3 className="text-center text-lg font-semibold text-gray-700">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      {currentCategory && <div>Current Category: {currentCategory}</div>}
    </section>
  );
}
