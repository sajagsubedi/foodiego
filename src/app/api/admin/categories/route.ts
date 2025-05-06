import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import imagekit from "@/lib/imagekit";
import CategoryModel from "@/models/category.model";
import { UserRole } from "@/models/user.model";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
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
    const categories = await CategoryModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, categories },
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

export async function POST(request: Request) {
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
    const slug = formData.get("slug") as string;
    const image = formData.get("image") as File | null;

    if ([name, slug].some((field) => field == null || field.trim() === "")) {
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

    const existingCategory = await CategoryModel.findOne({ slug });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category with this slug already exists" },
        {
          status: 400,
        }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedImage = await imagekit.upload({
      file: buffer,
      fileName: `${slug}--${Date.now()}`,
      folder: "/categories",
    });

    const newCategory = new CategoryModel({
      name,
      slug,
      image: {
        url: uploadedImage.url,
        fileId: uploadedImage.fileId,
      },
    });

    await newCategory.save();

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: newCategory,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create category" },
      {
        status: 500,
      }
    );
  }
}

