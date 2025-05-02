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
      profilePicture?: {
        url: string;
        fileId: string;
      };
      _id?: string;
      username?: string;
      isVerified?: boolean;
      userRole: UserRole;
    } & DefaultSession["user"];
  }
  
  interface User {
    _id?: string;
    profilePicture?: {
      url: string;
    };
    username?: string;
    isVerified?: boolean;
    userRole: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    profilePicture?: {
      url: string;
    };
    username?: string;
    isVerified?: boolean;
    userRole: UserRole;
  }
}
