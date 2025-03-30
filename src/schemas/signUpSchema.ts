import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(50, { message: "Full name  cannot be longer than 50 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(50, { message: "Username cannot be longer than 50 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, "Username cannot contain special characters!")
    .regex(/^[a-z0-9_]+$/, "Username must be in lowercase!"),
  password: z
    .string()
    .min(8, { message: "Password must be at least F8 characters long" })
    .max(1024, { message: "Password cannot be longer than 1024 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(50, { message: "Email cannot be longer than 50 characters" }),
});
