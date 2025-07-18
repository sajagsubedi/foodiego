import FoodModel from "@/models/food.model";
import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";

export async function GET() {
  connectDb();
  try {
    const foods = await FoodModel.find({ isFeatured: true }).limit(8).exec();

    return NextResponse.json(
      {
        success: true,
        data: foods,
        message: "Featured foods fetched successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching featured foods:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured foods" },
      { status: 500 }
    );
  }
}
