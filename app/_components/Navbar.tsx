"use client";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import MenuOverlay from "./MenuOverlay";
import { useAuthStore } from "@/store/user";
import { useRouter } from "next/navigation";
import axiosInstance from "../apis/axiosInstance";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { setUser, setIsLoggedIn } = useAuthStore((state) => state);
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      const response = await axiosInstance.get(
        `${axiosInstance.defaults.baseURL}/auth/logout`,
      );

      if (response.status === 200) {
        setUser("");
        setIsLoggedIn(false);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="fixed top-0 right-0 left-0 px-16 py-4 border border-b-gray-200 z-10 bg-white">
      <div className="flex items-center justify-between w-full">
        <Link href="/dashboard">
          <Image
            alt="logo"
            src="/images/logo.png"
            width={120}
            height={120}
            priority
          />
        </Link>
        <div className="md:hidden">
          {!navbarOpen ? (
            <button onClick={() => setNavbarOpen(true)}>
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button onClick={() => setNavbarOpen(false)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-4 items-center">
            <li className="text-slate-600 hover:text-[#FAAD66]">
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li className="text-slate-600 hover:text-[#FAAD66]">
              <Link href={"/favourites"}>Favourites</Link>
            </li>
            <li>
              <button
                className="bg-red-500 text-white rounded-md p-2"
                onClick={handleLogOut}
              >
                {" "}
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </div>

      {navbarOpen && <MenuOverlay handleLogOut={handleLogOut} />}
    </nav>
  );
};

export default Navbar;
