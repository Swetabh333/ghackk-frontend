"use client";

import { useAuthStore } from "@/store/user";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

const Protector = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuthStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, []);
  return <div>{isLoggedIn && children}</div>;
};
export default Protector;
