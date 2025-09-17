import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProviders";
import { ToastContainer } from "react-toastify";
import QueryProvider from "@/context/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodieGo",
  description:
    "Foodiego is your go-to food delivery platform. Browse, order, and track your meals effortlessly. Fresh, fast, and delicious, right at your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <AuthProvider>
          <QueryProvider>
            <ToastContainer
              position="top-left"
              autoClose={3000}
              style={{ width: "230px" }}
            />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
