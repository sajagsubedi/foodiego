import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters!")
  .max(20, "Username must be at less than 20 characters!")
  .regex(/^[a-zA-Z0-9_]+$/, "Username cannot contain special characters!")
  .regex(/^[a-z0-9_]+$/, "Username must be in lowercase!");

export const emailValidation = z
  .string()
  .email({ message: "Invalid email address" })
  .max(50, { message: "Email cannot be longer than 50 characters" });

export const signUpSchema = z.object({
  profilePicture: z
    .instanceof(File, {
      message: "Profile Picture is required",
    })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // Max file size: 10MB
      "File size must be less than or equal to 10MB"
    ),
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(50, { message: "Full name  cannot be longer than 50 characters" }),
  username: usernameValidation,
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(1024, { message: "Password cannot be longer than 1024 characters" }),
  email: emailValidation,
});
