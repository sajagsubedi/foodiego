import mongoose, { Document, Schema } from "mongoose";

export enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  SUPER_ADMIN = "SUPER_ADMIN",
}
export interface User extends Document {
  fullName: string;
  username: string;
  phoneNumber: string;
  isVerified: boolean;
  verificationCode: string;
  verificationCodeExpiry: Date;
  profilePicture: {
    public_id: string;
    url: string;
  };
  userType: UserType;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
      match: /^[0-9]{10}$/,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: true,
    },
    verificationCodeExpiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", userSchema);

export default UserModel;
