"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, type CartItem as CartItemType } from "@/lib/store/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const increment = () => updateQuantity(item.id, item.quantity + 1);
  const decrement = () => updateQuantity(item.id, Math.max(1, item.quantity - 1));
  const handleRemove = () => removeItem(item.id);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-rose-200 group">
      <div className="flex items-center gap-6">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 p-3 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-lg object-cover shadow-sm"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-rose-600 transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-700">NPR {item.price}</span>
            <span className="text-gray-400">×</span>
            <span className="font-semibold text-gray-700">{item.quantity}</span>
            <span className="text-gray-400">=</span>
            <span className="font-bold text-rose-600 text-lg">
              NPR {item.price * item.quantity}
            </span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 border border-gray-200">
            <button
              onClick={decrement}
              className="h-10 w-10 rounded-full bg-white hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 flex items-center justify-center shadow-sm border border-gray-200 hover:border-rose-300"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="min-w-[40px] text-center font-bold text-gray-900 text-lg">
              {item.quantity}
            </span>

            <button
              onClick={increment}
              className="h-10 w-10 rounded-full bg-white hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 flex items-center justify-center shadow-sm border border-gray-200 hover:border-rose-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="h-12 w-12 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-all duration-200 flex items-center justify-center group/delete hover:scale-110"
          >
            <Trash2 className="w-5 h-5 group-hover/delete:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}