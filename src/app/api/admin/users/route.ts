import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import UserModel from "@/models/user.model";
import { UserRole } from "@/models/user.model";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

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
    // Fetch all users from the database
    const users = await UserModel.find(
      { userRole: { $ne: UserRole.ADMIN } },
      { password: 0 }
    )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: users,
        message: "Users fetched successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users!" },
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
    const fullName = formData.get("fullName") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userRole = formData.get("userRole") as string;
    const isVerified = formData.get("isVerified") === "true";

    if (
      [fullName, username, email, password, userRole].some((field) => !field)
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    // Create a new user
    const newUser = await UserModel.create({
      fullName,
      username,
      email,
      password, // Ensure to hash the password in your model or middleware
      userRole,
      isVerified,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User  created successfully",
        data: newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create user!" },
      {
        status: 500,
      }
    );
  }
}
