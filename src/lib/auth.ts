import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { ZodError } from "zod";
import { signInSchema } from "@/schemas/signInSchema";
import UserModel from "@/models/user.model";
import connectDb from "./connectDb";
import { UserRole } from "@/types/next";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectDb();
        try {
          const { identifier, password } = await signInSchema.parseAsync(
            credentials
          );

          const existingUser = await UserModel.findOne({
            $or: [{ email: identifier }, { username: identifier }],
            isVerified: true,
          });

          if (!existingUser) {
            throw new Error("Invalid credentials.");
          }
          const isPasswordCorrect = await existingUser.isPasswordCorrect(
            password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid credentials.");
          }

          return existingUser as User; // Return the user object if authentication is successful
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
        return null; // Explicitly return null if no user is found or an error occurs
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.userRole = user.userRole as UserRole;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.username = token.username as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.userRole = token.userRole as UserRole;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};
