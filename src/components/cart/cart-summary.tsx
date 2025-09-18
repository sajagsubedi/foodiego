"use client";

import React from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { ShoppingBag, CreditCard } from "lucide-react";

export function CartSummary() {
  const { 
    items, 
    getTotalItems, 
    getTotalPrice, 
    clearCart, 
    isLoading 
  } = useCartStore();

  const subtotal = getTotalPrice();
  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    console.log("Proceeding to checkout...");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="w-full lg:w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
        <div className="text-center py-8">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-rose-100 rounded-lg">
          <ShoppingBag className="w-5 h-5 text-rose-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Items ({getTotalItems()})</span>
          <span className="font-semibold text-gray-900">Rs.{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-semibold text-gray-900">Rs.{deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-rose-500">Rs.{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          Proceed to Checkout
        </button>
        
        <button
          onClick={handleClearCart}
          disabled={isLoading}
          className="w-full text-gray-500 hover:text-red-500 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}