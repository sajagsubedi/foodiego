// components/PopularFoodItems.tsx

import Image from "next/image";
import { Plus, Star } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  fakedPrice?: number;
}

const PopularFoodItems: React.FC = () => {
  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: "Delicious Burger",
      description: "Juicy patty, fresh toppings, special sauce.",
      price: 12.99,
      rating: 4.5,
      imageUrl:
        "https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg",
      fakedPrice: 15.99,
    },
    {
      id: 2,
      name: "Spicy Noodles",
      description: "Hot and flavorful noodles with veggies.",
      price: 10.5,
      rating: 5,
      imageUrl:
        "https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg",
    },
    {
      id: 3,
      name: "Veggie Pizza",
      description: "Fresh veggies on a crispy crust.",
      price: 15.0,
      rating: 3.8,
      imageUrl:
        "https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg",
      fakedPrice: 18.0,
    },
    {
      id: 4,
      name: "Chicken Tacos",
      description: "Spicy chicken, fresh salsa, and creamy avocado.",
      price: 9.75,
      rating: 4.2,
      imageUrl:
        "https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg",
    },
    {
      id: 5,
      name: "Cheesy Pasta",
      description: "Creamy cheese sauce with perfectly cooked pasta.",
      price: 11.5,
      rating: 4.7,
      imageUrl:
        "https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg",
      fakedPrice: 13.99,
    },
    {
      id: 6,
      name: "Grilled Sandwich",
      description: "Toasted sandwich with grilled veggies and cheese.",
      price: 7.99,
      rating: 4.1,
      imageUrl:
        "https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg",
    },
    {
      id: 7,
      name: "Crispy Fried Chicken",
      description: "Golden crispy chicken with secret spices.",
      price: 13.25,
      rating: 4.6,
      imageUrl:
        "https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg",
      fakedPrice: 16.0,
    },
    {
      id: 8,
      name: "Sushi Platter",
      description: "Assorted sushi rolls with fresh ingredients.",
      price: 17.99,
      rating: 4.9,
      imageUrl:
        "https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg",
    },
  ];

  const truncateDescription = (
    description: string,
    maxLength: number
  ): string => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength - 3) + "...";
  };

  return (
    <section className="flex flex-col items-center justify-center py-10 mt-10 px-[5vw]">
      <div className=" w-full mb-5 flex flex-col items-center">
        <div className="h-1 w-20 bg-rose-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-rose-500 ">
          POPULAR FOODS
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className=" rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-auto">
              <Image
                src={item.imageUrl}
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
                    fill={
                      index < Math.floor(item.rating) ? "currentColor" : "none"
                    }
                    size={16}
                  />
                ))}
                <span className="ml-1 text-gray-600">
                  ({item.rating.toFixed(1)})
                </span>
              </div>
              <p className="text-gray-600 mb-4 text-nowrap">
                {truncateDescription(item.description, 40)}
              </p>
              <div className="flex justify-center gap-2 items-center">
                <p className="text-gray-600 font-semibold line-through h-full text-lg flex items-center justify-center">
                  {item.fakedPrice && `Rs${item.fakedPrice.toFixed(2)}`}
                </p>
                <h4 className="font-bold text-2xl text-rose-700">
                  Rs{item.price.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularFoodItems;
