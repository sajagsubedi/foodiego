import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import imagekit from "@/lib/imagekit";
import CategoryModel from "@/models/category.model";
import FoodModel from "@/models/food.model";
import { UserRole } from "@/models/user.model";
import { getServerSession, User } from "next-auth";
import type { NextRequest } from "next/server";
import { Types } from "mongoose";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user || user.userRole !== UserRole.ADMIN) {
    return Response.json(
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

    const { id } = await params;

    const existingFood = await FoodModel.findById(id);

    if (!existingFood) {
      return Response.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }
    if (categorySlug) {
      const category = await CategoryModel.findOne({ slug: categorySlug });
      if (!category) {
        return Response.json(
          { success: false, message: "Category not found" },
          { status: 404 }
        );
      }
      existingFood.categoryID = category._id as Types.ObjectId;
    }

    if (image) {
      if (existingFood.image?.fileId) {
        await imagekit.deleteFile(existingFood.image.fileId);
      }
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadedImage = await imagekit.upload({
        file: buffer,
        fileName: `${categorySlug}/${name}--${Date.now()}`,
        folder: "/foods",
      });

      existingFood.image = {
        url: uploadedImage.url,
        fileId: uploadedImage.fileId,
      };
    }

    if (name) existingFood.name = name;
    if (price) existingFood.price = Number(price);
    if (markedPrice) existingFood.markedPrice = Number(markedPrice);
    if (description) existingFood.description = description;
    if (isFeatured) existingFood.isFeatured = isFeatured == "true";
    if (visibility) existingFood.visibility = visibility == "true";

    await existingFood.save();

    return Response.json(
      {
        success: true,
        message: "Food updated successfully",
        data: existingFood,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error updating food:", error);
    return Response.json(
      { success: false, message: "Failed to update food!" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;
  if (!user || user.userRole !== UserRole.ADMIN) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }
  try {
    const { id } = await params;

    const existingFood = await FoodModel.findById(id);
    if (!existingFood) {
      return Response.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }

    const deletedFood = await FoodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return Response.json({
        success: false,
        message: "Failed to delete food item",
      });
    }

    //delete image from imagekit
    if (deletedFood.image?.fileId) {
      await imagekit.deleteFile(existingFood.image.fileId);
    }

    return Response.json({
      success: true,
      message: "Food item deleted successfully",
      data: deletedFood,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    return Response.json(
      { success: false, message: "Failed to delete food!" },
      {
        status: 500,
      }
    );
  }
}
