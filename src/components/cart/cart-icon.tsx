"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";

export function CartIcon() {
  const { getTotalItems, isLoading } = useCartStore();
  const itemCount = getTotalItems();

  return (
    <Link href="/cart" className="relative">
      <div className="relative p-2 text-gray-700 hover:text-rose-500 transition-colors">
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </Link>
  );
}
