"use client";

import { formatCurrency, truncateDescription } from "@/lib/utils";
import { Food } from "@/types/foods";
import { Plus, Star, Minus, Check } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useCartStore } from "@/lib/store/cart-store";

const FoodCard = ({ item }: { item: Food }) => {
  const { addItem, updateQuantity, getItemQuantity, isItemInCart, isLoading } = useCartStore();
  const quantity = getItemQuantity(item._id);
  const inCart = isItemInCart(item._id);

  const handleAddToCart = () => {
    addItem(item._id, 1, item);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(item._id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(item._id, quantity - 1);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative w-full h-auto">
        <Image
          src={item.image.url}
          alt={item.name}
          width={500}
          height={300}
          className="object-cover w-full h-48"
        />

        {/* Add to Cart Button */}
        {!inCart ? (
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="absolute bottom-2 right-2 bg-rose-500 text-white font-semibold p-2 rounded-full hover:bg-rose-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5" />
          </button>
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white rounded-full shadow-lg">
            <button
              onClick={handleDecreaseQuantity}
              disabled={isLoading || quantity <= 1}
              className="p-1 text-rose-500 hover:text-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 py-1 text-sm font-semibold text-gray-900 min-w-[24px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncreaseQuantity}
              disabled={isLoading}
              className="p-1 text-rose-500 hover:text-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* In Cart Indicator */}
        {inCart && (
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
            <Check className="h-4 w-4" />
          </div>
        )}
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
