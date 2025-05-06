import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Food Lover",
    quote:
      "FoodieGo delivers more than just food — it delivers happiness! My go-to app for lazy evenings.",
    image: "/assets/clients/client-1.jpg",
  },
  {
    id: 2,
    name: "Ram Subedi",
    role: "College Student",
    quote:
      "Late-night cravings? FoodieGo to the rescue! Affordable, fast, and so tasty.",
    image: "/assets/clients/client-2.jpg",
  },
  {
    id: 3,
    name: "Sneha Thapa",
    role: "Busy Professional",
    quote:
      "No time to cook? FoodieGo is my savior. The delivery is always on time and the food stays hot.",
    image: "/assets/clients/client-3.jpg",
  },
];

export default function TestimonialSection(): React.ReactElement {
  return (
    <section className="py-16 px-6 md:px-[5vw] bg-white text-gray-800">
      {/* Section Header */}
      <div className=" w-full mb-5 flex flex-col items-center">
        <div className="h-1 w-20 bg-rose-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-rose-500 ">
          TESTIMONIALS
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover what our satisfied users have to say about their experience.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-3xl shadow-md overflow-hidden p-6 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Quote Icon */}
            <div className="flex justify-center mb-6 text-rose-500 text-4xl">
              <Quote fill="currentColor" className="w-8 h-8" />
            </div>

            {/* Quote */}
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              &quot;{testimonial.quote}&quot;
            </p>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <Image
                src={testimonial.image}
                alt={`${testimonial.name}'s profile`}
                height={48}
                width={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-rose-500 shadow-sm"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
