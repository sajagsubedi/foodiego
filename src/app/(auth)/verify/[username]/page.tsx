"use client";

import React, { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Page() {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits (0-9)
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);
    const verificationCode = otp.join("");

    if (verificationCode.length < 6) {
      return toast.error("Please enter all 6 digits.");
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/auth/verify-code", {
        username: param.username,
        verificationCode,
      });
      toast.success(response.data.message);
      router.replace(`/signin`);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Verification failed. Try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify your Account
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          Enter the verification code sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-xl text-center border rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600 flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting && <AiOutlineLoading3Quarters className="animate-spin mr-2" />}Verify
            Code
          </button>
        </form>
      </div>
    </section>
  );
}
