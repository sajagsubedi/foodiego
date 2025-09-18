import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import CartModel from "@/models/cart.model";
import FoodModel from "@/models/food.model";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  await connectDb();
  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    let userCart = await CartModel.findOne({ userId: user._id });
    if (!userCart) {
      userCart = await CartModel.create({ userId: user._id, items: [] });
    }
    const cartItems = await CartModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "foods",
          localField: "items.foodId",
          foreignField: "_id",
          as: "matchedFood",
        },
      },
      {
        $unwind: "$matchedFood",
      },
      {
        $project: {
          _id: "$items._id",
          foodId: "$items.foodId",
          quantity: "$items.quantity",
          food: "$matchedFood",
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Cart retrieved successfully",
        data: {
          ...userCart,
          items: cartItems,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error retrieving cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDb();
  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { foodId, quantity } = await request.json();

    if (!foodId || !quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid foodId or quantity" },
        { status: 400 }
      );
    }

    const food = await FoodModel.findById(foodId);
    if (!food) {
      return NextResponse.json(
        { success: false, message: "Food not found" },
        { status: 404 }
      );
    }

    let cart = await CartModel.findOne({ userId: user._id });
    console.log("Cart", cart);

    if (!cart) {
      cart = new CartModel({ userId: user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ foodId, quantity });
    }

    await cart.save();

    const cartItems = await CartModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "foods",
          localField: "items.foodId",
          foreignField: "_id",
          as: "matchedFood",
        },
      },
      {
        $unwind: "$matchedFood",
      },
      {
        $project: {
          _id: "$items._id",
          foodId: "$items.foodId",
          quantity: "$items.quantity",
          food: "$matchedFood",
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Item added to cart successfully",
        data: {
          ...cart,
          items: cartItems,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error adding item to cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  await connectDb();
  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const cart = await CartModel.findOne({ userId: user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    return NextResponse.json(
      { success: true, message: "Cart cleared successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error clearing cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
