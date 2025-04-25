"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/assets/logo.png"
            alt={"logo"}
            className="w-80 md:w-[400px] shadow-3xl shadow-gray-100"
            width={3000}
            height={3000}
          />
        </div>
        <div className="mb-8 flex justify-center">
          <FileQuestion className="h-32 w-32 text-rose-500 animate-pulse" />
        </div>

        <h1 className="text-6xl font-bold text-rose-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-rose-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-rose-600 mb-8">
          Oops! The page you&apos;re looking for seems to have gone on an
          unexpected journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.back()}
            className="bg-white border-rose-500 hover:bg-rose-100 transition-all transform hover:scale-105 shadow-sm border-2 outline-none py-2 px-5 font-bold rounded text-rose-500 flex items-center gap-2 max-w-max"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          <Link
            className="bg-rose-500 border-2 border-rose-500 transition-all transform hover:scale-105 outline-none py-2 px-5 font-bold rounded text-white flex items-center gap-2 max-w-max "
            href="/"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}