"use client";

import React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/lib/store/cart-store";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, isLoading } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.foodId, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.foodId);
  };

  if (!item.food) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      {/* Food Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.food.image.url}
          alt={item.food.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      {/* Food Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-lg truncate">
          {item.food.name}
        </h3>
        <p className="text-rose-500 font-bold text-lg">
          Rs. {item.food.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isLoading || item.quantity <= 1}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-8 text-center font-semibold text-gray-900">
          {item.quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isLoading}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="font-bold text-gray-900 text-lg">
          Rs. {(item.food.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={isLoading}
        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
