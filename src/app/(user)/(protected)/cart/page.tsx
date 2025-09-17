"use client";

import React, { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { ShoppingCart, Package, Heart } from "lucide-react";

export default function CartPage() {
  const { items, fetchDefaultCart } = useCartStore();

  useEffect(() => {
    fetchDefaultCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
      <div className="relative container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 rounded-3xl mb-6 shadow-2xl">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-rose-600 via-rose-700 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Your Cart
          </h1>
          <p className="text-gray-600 text-xl max-w-md mx-auto font-medium">
            Review your delicious selections and proceed to checkout
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="flex-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                  <div className="p-3 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl">
                    <Package className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Cart Items
                    </h2>
                    <p className="text-gray-600 font-medium">
                      {items.length} {items.length === 1 ? "item" : "items"}{" "}
                      selected
                    </p>
                  </div>
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <ShoppingCart className="w-16 h-16 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 text-lg mb-6 max-w-sm mx-auto">
                      Looks like you havent added any delicious items to your
                      cart yet!
                    </p>
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Heart className="w-5 h-5" />
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="lg:sticky lg:top-8 h-fit">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
