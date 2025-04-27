import "next-auth";

export enum UserRole {
  USER = "USER",
  STAFF = "STAFF",
  RIDER = "RIDER",
  ADMIN = "ADMIN",
}

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      username?: string;
      isVerified?: boolean;
      userRole?: UserRole;
    } & DefaultSession["user"];
  }
  interface User {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    userRole?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    userRole: UserRole;
  }
}
