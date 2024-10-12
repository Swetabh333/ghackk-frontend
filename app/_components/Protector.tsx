"use client";

import { useAuthStore } from "@/store/user";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

const Protector = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuthStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);
  return <div>{isLoggedIn && children}</div>;
};
export default Protector;
