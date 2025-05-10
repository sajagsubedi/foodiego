import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import imagekit from "@/lib/imagekit";
import CategoryModel from "@/models/category.model";
import { UserRole } from "@/models/user.model";
import { getServerSession, User } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    const existingCategory = await CategoryModel.findById(id);

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category doesnot exists!" },
        {
          status: 400,
        }
      );
    }

    if (image) {
      //delete the old image from imagekit
      if (existingCategory.image?.fileId) {
        await imagekit.deleteFile(existingCategory.image.fileId);
      }
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadedImage = await imagekit.upload({
        file: buffer,
        fileName: `${slug}--${Date.now()}`,
        folder: "/categories",
      });

      existingCategory.image = {
        url: uploadedImage.url,
        fileId: uploadedImage.fileId,
      };
    }

    if (name) existingCategory.name = name;

    if (slug) {
      const existingSlugCategory = await CategoryModel.findOne({ slug });
      if (existingSlugCategory && existingSlugCategory.id !== id) {
        return NextResponse.json(
          { success: false, message: "Category with this slug already exists" },
          {
            status: 400,
          }
        );
      }
      existingCategory.slug = slug;
    }

    await existingCategory.save();

    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully",
        data: existingCategory,
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
