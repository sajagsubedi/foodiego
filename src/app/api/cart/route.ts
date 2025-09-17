import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import CartModel from "@/models/cart.model";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDb();
  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }
  try {
    let cart = await CartModel.findOne({ userId: user.id,
     });
    console.log("Cart found:", cart);

    if (!cart) {
      cart = new CartModel({ userId: user._id, items: [] });
      await cart.save();
    }

    return NextResponse.json(
      { success: true, message: "Cart retrieved successfully", data: cart },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error retrieving cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve cart" },
      {
        status: 500,
      }
    );
  }
}
