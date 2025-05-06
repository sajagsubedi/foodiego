"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import LoadingPage from "@/components/shared/Loading";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return <LoadingPage />;
  }

  if (status == "unauthenticated") {
    router.push("/signin");
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }
};

export default AuthGuard;
