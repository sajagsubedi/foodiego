"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState(""); //message from api on checking username validation
  const [isCheckingUsername, setIsCheckingUsername] = useState(false); //for showing loader below username input
  const [debouncedUsername] = useDebounceValue(username, 300);
  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get<ApiResponse>(
            `/api/auth/check-username-unique?username=${debouncedUsername}`
          );
          setUsernameMessage(response?.data?.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError?.response?.data?.message || "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUserNameUnique();
  }, [debouncedUsername]);

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(""); //message from api on checking email validation
  const [isCheckingEmail, setIsCheckingEmail] = useState(false); //for showing loader below email input
  const [debouncedEmail] = useDebounceValue(email, 300);
  useEffect(() => {
    const checkEmailUnique = async () => {
      if (debouncedEmail) {
        setIsCheckingEmail(true);
        setEmailMessage("");
        try {
          const response = await axios.get<ApiResponse>(
            `/api/auth/check-email-unique?email=${debouncedEmail}`
          );
          setEmailMessage(response?.data?.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setEmailMessage(
            axiosError?.response?.data?.message || "Error checking email"
          );
        } finally {
          setIsCheckingEmail(false);
        }
      }
    };
    checkEmailUnique();
  }, [debouncedEmail]);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      console.log(data);
      const response = await axios.post<ApiResponse>("/api/auth/signup", data);
      toast.success(response.data.message);
      router.replace(`/verify/${username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        "There was a problem during signup. Please try again later ";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="text-gray-600 body-font px-6 pt-20 flex justify-center">
      <div className="w-full sm:w-[325px] flex flex-col">
        <h2 className=" text-2xl md:text-3xl mb-4 font-bold title-font text-left ">
          Get <span className="text-rose-600">Started</span> with us
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative mb-4">
            <label
              htmlFor="fullName"
              className="leading-7 text-sm text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              required
              placeholder="John Doe"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="username"
              className="leading-7 text-sm text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              placeholder="johndoe"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {isCheckingUsername && <LoaderCircle className="animate-spin" />}
            {!isCheckingUsername && usernameMessage && (
              <p
                className={`text-sm ${
                  usernameMessage === "Username is available!"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {usernameMessage}
              </p>
            )}
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="johndoe@example.com"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {isCheckingEmail && <LoaderCircle className="animate-spin" />}
            {!isCheckingEmail && emailMessage && (
              <p
                className={`text-sm ${
                  emailMessage === "Email is available!"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {emailMessage}
              </p>
            )}
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="••••••••"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-rose-600 border-0 py-2 px-6 mt-5 gap-2 focus:outline-none w-full hover:bg-rose-700 rounded text- flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting && <LoaderCircle className="animate-spin text-lg" />}
            Signup
          </button>
        </form>
        <div className="mt-5 flex items-center gap-2 justify-center text-gray-500">
          <hr className="w-[175px] h-[2px] bg-gray-200" />
          or
          <hr className="w-[175px]  h-[2px] bg-gray-200" />
        </div>
        <p
          className="flex gap-2 justify-end 
                    mt-6"
        >
          Already have a account?
          <Link className="text-rose-500 underline" href="/signin">
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
}
