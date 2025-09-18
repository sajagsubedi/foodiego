import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import CartModel from "@/models/cart.model";
import FoodModel from "@/models/food.model";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ foodId: string }> }
) {
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
    console.log("Request till here");
    const { foodId } = await params;
    const { quantity } = await request.json();
    console.log("Till");

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity" },
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

    const cart = await CartModel.findOne({ userId: user._id });
    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Item not found in cart" },
        { status: 404 }
      );
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    return NextResponse.json(
      {
        success: true,
        message: "Item quantity updated successfully",
        data: cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating cart item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ foodId: string }> }
) {
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
    const { foodId } = await params;

    const cart = await CartModel.findOne({ userId: user._id });
    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Item not found in cart" },
        { status: 404 }
      );
    }

    cart.items.splice(itemIndex, 1);
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
        message: "Item removed from cart successfully",
        data: { ...cart, items: cartItems },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error removing cart item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to remove cart item" },
      { status: 500 }
    );
  }
}
