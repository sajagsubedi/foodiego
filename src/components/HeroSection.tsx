import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="relative">
        <div
          className="absolute inset-0 blur-xl h-[580px]"
          style={{
            background:
              "linear-gradient(143.6deg, rgba(255, 102, 132, 0) 20.79%, rgba(249, 72, 121, 0.26) 40.92%, rgba(238, 102, 171, 0) 70.35%);",
          }}
        ></div>
      </div>
      <section className="relative bg-cover bg-center h-[580px] flex items-center justify-center px-20">
        <div className="flex flex-col items-center justify-center h-[580px] text-center text-white w-1/2">
          <h1 className="text-5xl font-bold mb-4 text-rose-500">
            Bringing Flavor to Your Doorstep!
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Skip the wait and savor every bite! With Foodiego, delicious meals
            are just a tap away—fresh, fast, and delivered to you in no time.{" "}
          </p>
          <div className="flex gap-4">
            <button className="bg-white border-2 border-rose-500 text-rose-500 transition-all transform  hover:scale-105 hover:bg-rose-100 font-bold py-2 px-4 rounded">
              Explore Menu
            </button>

            <button className="bg-rose-500 hover:bg-rose-600 border-2 border-rose-500 transition-all transform hover:scale-105 text-white font-bold py-2 px-4 rounded">
              Order Now
            </button>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
        <Image alt="bannner" src="/banner.png" height={3000} width={3000} className="max-w-96"/>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
