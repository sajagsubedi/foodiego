import Image from "next/image";
import React from "react";
import Button from "../shared/Button";

const HeroSection = () => {
  return (
    <>
      <div className="relative">
        <div
          className="absolute inset-0 blur-xl h-[580px]"
          style={{
            background:
              "linear-gradient(143.6deg, rgba(255, 102, 132, 0) 20.79%, rgba(249, 72, 121, 0.26) 40.92%, rgba(238, 102, 171, 0) 70.35%)",
          }}
        ></div>
      </div>
      <section className="relative bg-cover bg-center h-auto min-h-[580px] flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-20 py-8 md:py-0">
        <div className="flex flex-col items-center justify-center h-full text-center text-white w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-rose-500">
            Bringing Flavor to Your Doorstep!
          </h1>
          <p className="text-base sm:text-lg mb-8 text-gray-600 max-w-md">
            Skip the wait and savor every bite! With Foodiego, delicious meals
            are just a tap away—fresh, fast, and delivered to you in no time.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">Explore Menu</Button>
            <Button>Order Now</Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image
            alt="bannner"
            src="/assets/banner.png"
            height={3000}
            width={3000}
            className="max-w-[250px] sm:max-w-[300px] md:max-w-[400px]"
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
