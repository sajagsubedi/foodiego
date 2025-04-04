import UserModel from "@/models/user.model";
import connectDb from "@/lib/connectDb";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  // Connect to the database
  await connectDb();
  try {
    let newUser = null;
    const reqBody = await request.json();

    // Get the username, password, and email from the request body
    const { fullName, email, username, password } = reqBody;
    // Check if all fields are provided
    if (
      [fullName, email, username, password].some(
        (field) => field == null || field.trim() === ""
      )
    ) {
      return NextResponse.json(
        { success: false, message: "Please provide all the fields" },
        {
          status: 400,
        }
      );
    }
    // Check if a user with the same username already exists
    const existingUserWithUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserWithUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "User with username already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Check if a user with the same email already exists
    const existingUserWithEmail = await UserModel.findOne({ email });
    // Generate a random verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    if (existingUserWithEmail) {
      // If the user with the same email exists and is verified, return an error
      if (existingUserWithEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User with email already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        // If the user with the same email exists but is not verified, update the user's information
        const verificationCodeExpiry = new Date(Date.now() + 600000); // 10 minutes
        existingUserWithEmail.password = password;
        existingUserWithEmail.verificationCode = verificationCode;
        existingUserWithEmail.username = username;
        existingUserWithEmail.verificationCodeExpiry = verificationCodeExpiry;
        await existingUserWithEmail.save();
        newUser = existingUserWithEmail;
      }
    } else {
      // If the user with the same email does not exist, create a new user
      const verificationCodeExpiry = new Date(Date.now() + 600000); // 10 minutes
      newUser = new UserModel({
        username,
        password: password,
        email,
        fullName,
        isVerified: false,
        isAcceptingMesages: true,
        verificationCode,
        verificationCodeExpiry,
      });
      await newUser.save();
    }

    console.log("New user created:", newUser);
    // Send a verification email to the user
    const emailResponse = await sendVerificationEmail({
      email,
      username,
      verificationCode,
      verificationCodeExpiry: newUser?.verificationCodeExpiry,
    });

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    console.log("Email sent successfully:", emailResponse.message);

    // Return a success response
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully.Please verify your email",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
};
