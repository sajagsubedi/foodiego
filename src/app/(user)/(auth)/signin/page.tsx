"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { z } from "zod";
import Button from "@/components/shared/Button";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: { identifier: string; password: string }) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      toast.error("Invalid credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <section className="text-gray-600 body-font px-6 pt-20 flex justify-center">
      <div className="w-full sm:w-[325px] flex flex-col">
        <h2 className="text-2xl md:text-3xl mb-4 font-bold title-font text-left">
          Hey&#44;
          <br />
          <span className="text-rose-600">Welcome</span> back.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative mb-4">
            <label
              htmlFor="identifier"
              className="leading-7 text-sm text-gray-600"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              {...register("identifier")}
              required
              placeholder="Enter your email or username"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
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
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <LoaderCircle className="animate-spin text-lg" />}
            Signin
          </Button>
        </form>
        <div className="mt-5 flex items-center gap-2 justify-center text-gray-500">
          <hr className="w-[175px] h-[2px] bg-gray-200" />
          or
          <hr className="w-[175px] h-[2px] bg-gray-200" />
        </div>
        <p className="flex gap-2 justify-end mt-6">
          Don&apos;t have an account?
          <Link className="text-rose-500 underline" href="/signup">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
}
