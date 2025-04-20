import nodemailer from "nodemailer";

// Load environment variables from .env file
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;

export const sendVerificationEmail = async (data: {
  username: string;
  email: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Define the HTML template with dynamic placeholders
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Foodiego Email Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f8f8f8; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
              <img src="https://foodieg.vercel.app/assets/logo.png" alt="Foodiego Logo" style="width: 150px;">
              <h2 style="font-size: 22px; font-weight: bold; color: #333;">Welcome to Foodiego, ${data.username}!</h2>
              <p style="font-size: 16px; color: #555; margin-top: 10px;">Thank you for signing up. To complete your registration, please verify your email address using the verification code below:</p>
              <p style="font-size: 22px; font-weight: bold; color: #d35400; margin: 10px 0;">${data.verificationCode}</p>
              <p style="font-size: 16px; color: #555;">Enter the verification code in the link below to verify your email address:</p>
              <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify/${data.username}" style="word-break: break-all; color: #d35400; text-decoration: none;">${process.env.NEXT_PUBLIC_BASE_URL}/verify/${data.username}</a></p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify/${data.username}" style="display: inline-block; margin-top: 15px; padding: 12px 20px; background: #d35400; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Verify Email</a>
              <p style="font-size: 16px; color: #555; margin-top: 10px;">This code is valid until <strong>${data.verificationCodeExpiry}</strong>. If you did not sign up for Foodiego, please ignore this email.</p>
              <p style="font-size: 14px; color: #777; margin-top: 20px;">&copy; 2025 Foodiego. All rights reserved.</p>
          </div>
      </body>
      </html>
    `;

    // Send email
    const result = await transporter.sendMail({
      from: `Foodiego <${EMAIL_USER}>`,
      to: data.email,
      subject: "Verify Your Email - Foodiego",
      html: emailHtml,
    });
    console.log(result);
    return { success: true, message: "Verification email sent." };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
};
