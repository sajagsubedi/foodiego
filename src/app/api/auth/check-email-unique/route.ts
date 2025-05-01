import { emailValidation } from "@/schemas/signUpSchema";
import connectDb from "@/lib/connectDb";
import UserModel from "@/models/user.model";
import { z } from "zod";
import { NextResponse } from "next/server";

const EmailQuerySchema = z.object({
  email: emailValidation,
});

export const GET = async (request: Request) => {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      email: searchParams.get("email"),
    };

    const result = EmailQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const emailErrors = result.error.format().email?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            emailErrors.length > 0
              ? emailErrors.join(", ")
              : "Invalid Query parameters",
        },
        { status: 400 }
      );
    }
    const { email } = result?.data;

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser?.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email isn't available! Please try another.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Email is available!",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("Error in check-email-unique route", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
