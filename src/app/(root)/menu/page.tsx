"use client";

import { categories } from "@/constants/Categories";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  return (
    <section className="flex flex-col items-center justify-center py-10 px-[5vw]">
      <div className=" w-full lg:mb-0 flex flex-col items-center">
        <div className="h-1 w-20 bg-rose-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-rose-500 ">
          Menu
        </h2>
      </div>
      <div className="flex gap-4 mt-10 justify-around">
        <Link href={`/menu`}>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src={"/assets/allfood.jpg"}
              alt={"All"}
              width={40}
              height={40}
              className={`w-32 h-32 rounded-full ${
                !currentCategory  ? "border-4 border-rose-500" : ""
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
                src={category.image}
                alt={category.name}
                width={40}
                height={40}
                className={`w-32 h-32 rounded-full ${
                  currentCategory == category.slug ? "border-4 border-rose-500" : ""
                } hover:scale-105 transition-all duration-300 ease-in-out`}
              />
              <h3 className="text-center text-lg font-semibold text-gray-700">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      {currentCategory}
    </section>
  );
}
