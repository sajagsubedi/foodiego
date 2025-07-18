import connectDb from "@/lib/connectDb";
import CategoryModel from "@/models/category.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDb();

  try {
    const categories = await CategoryModel.find({});
    return NextResponse.json(
      {
        success: true,
        data: categories,
        message: "Categories fetched successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      {
        status: 500,
      }
    );
  }
}
