import { ApiResponse } from "@/types/ApiResponse";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verificationCode: string
): Promise<ApiResponse> => {
  console.log(
    "Sending verification email to:",
    email,
    "username:",
    username,
    "with code:",
    verificationCode
  );
  return {
    success: true,
    message: "Verification email sent successfully.",
  };
};
