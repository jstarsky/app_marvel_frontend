"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/characters");
    }
  }, [isAuthenticated]);
  return null;
}
