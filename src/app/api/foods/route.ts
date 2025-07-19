import FoodModel from "@/models/food.model";
import { type NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import CategoryModel from "@/models/category.model";

export async function GET(request: NextRequest) {
  connectDb();
  try {
    const category = request.nextUrl.searchParams.get("category");
    console.log("Category:", category);
    const searchObj: {
      visibility: boolean;
      categoryID?: string;
    } = {
      visibility: true,
    };
    if (category || category != "null") {
      const foundCategory = await CategoryModel.findOne({ slug: category });
      if (foundCategory) {
        searchObj.categoryID = String(foundCategory._id);
      }
    }

    const foods = await FoodModel.find(searchObj);

    return NextResponse.json(
      {
        success: true,
        data: foods,
        message: "Foods fetched successfully!",
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
