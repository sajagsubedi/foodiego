import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import imagekit from "@/lib/imagekit";
import CategoryModel from "@/models/category.model";
import FoodModel from "@/models/food.model";
import { UserRole } from "@/models/user.model";
import mongoose from "mongoose";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectDb();

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user || user.userRole !== UserRole.ADMIN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }
  try {
    const url = request.nextUrl;
    const category = url.searchParams.get("category");

    // Define the aggregation pipeline with type
    const aggregationPipeline: mongoose.PipelineStage[] = [];

    if (category) {
      const foodCategory = await CategoryModel.findOne({ slug: category });
      if (!foodCategory) {
        return NextResponse.json(
          { success: false, message: "Category not found" },
          {
            status: 404,
          }
        );
      }
      aggregationPipeline.push({
        $match: {
          categoryID: foodCategory._id,
        },
      });
    }

    aggregationPipeline.push(
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $addFields: {
          category: {
            $first: "$category",
          },
        },
      }
    );

    const foods = await FoodModel.aggregate(aggregationPipeline);

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
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      { success: false, message: "Failed to foods!" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectDb();

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user || user.userRole !== UserRole.ADMIN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const markedPrice = formData.get("markedPrice") as string;
    const description = formData.get("description") as string;
    const isFeatured = formData.get("isFeatured") as string;
    const visibility = formData.get("visibility") as string;
    const categorySlug = formData.get("categorySlug") as string;
    const image = formData.get("image") as File | null;

    if (
      [name, price, description, isFeatured, visibility, categorySlug].some(
        (field) => field == null || field.trim() === ""
      )
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    if (!image) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        {
          status: 400,
        }
      );
    }

    const existingCategory = await CategoryModel.findOne({
      slug: categorySlug,
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category doesnot exists!" },
        {
          status: 400,
        }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedImage = await imagekit.upload({
      file: buffer,
      fileName: `${categorySlug}/${name}--${Date.now()}`,
      folder: "/foods",
    });

    const newFood = await FoodModel.create({
      name,
      price,
      description,
      isFeatured: isFeatured == "true",
      visibility: visibility == "true",
      markedPrice,
      categoryID: existingCategory._id,
      image: uploadedImage,
    });

    const [createdFood] = await FoodModel.aggregate([
      {
        $match: {
          _id: newFood._id,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $addFields: {
          category: {
            $first: "$category",
          },
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Food created successfully",
        data: createdFood,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating food:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create food!" },
      {
        status: 500,
      }
    );
  }
}
