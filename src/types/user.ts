export enum UserRole {
  USER = "USER",
  STAFF = "STAFF",
  RIDER = "RIDER",
  ADMIN = "ADMIN",
}

export interface User {
  _id: string;
  profilePicture: {
    url: string;
    fileId: string;
  };
  fullName: string;
  username: string;
  email: string;
  isVerified: boolean;
  userRole: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
