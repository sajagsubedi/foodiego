"use client";

import { UserRole } from "@/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status, data: session } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return "Loading ...";
  }

  if (status == "unauthenticated" || session?.user.UserRole == UserRole.USER) {
    router.push("/signin");
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
