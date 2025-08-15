import { authOptions } from "@/lib/auth";
import connectDb from "@/lib/connectDb";
import UserModel from "@/models/user.model";
import { UserRole } from "@/models/user.model";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
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
