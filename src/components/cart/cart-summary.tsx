"use client";

import React from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { ShoppingBag, Shield } from "lucide-react";

export function CartSummary() {
  const { getTotalPrice, getTotalItems } = useCartStore();
  
  const subtotal = getTotalPrice();
  const deliveryFee = 200;
  const total = subtotal + deliveryFee;
  const itemCount = getTotalItems();

  return (
    <div className="w-full md:w-96 bg-gradient-to-br from-white via-rose-50/30 to-orange-50/30 rounded-2xl shadow-2xl border border-white/50 backdrop-blur-sm">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b border-gray-200 pb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Summary</h2>
          <p className="text-sm text-gray-600 font-medium">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 font-medium">Subtotal</span>
            <span className="font-bold text-gray-900 text-lg">
              NPR {subtotal}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 font-medium">Delivery Fee</span>
            <span className="text-gray-900 font-semibold">NPR {deliveryFee}</span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-rose-600">NPR {total}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:via-rose-700 hover:to-pink-700 text-white font-bold py-4 px-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
          <ShoppingBag className="w-5 h-5" />
          Proceed to Checkout
        </button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="font-medium">Secure checkout with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
}