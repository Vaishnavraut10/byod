"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function PostAuth() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) router.replace("/login");
    else {
      const role = user.publicMetadata?.role || "employee";
      router.replace(role === "admin" ? "/admin" : "/dashboard");
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-700">
      Redirecting securely...
    </div>
  );
}