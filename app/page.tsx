"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/user";
import axiosInstance from "./apis/axiosInstance";
import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { setUser, setIsLoggedIn } = useAuthStore((state) => state);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Use axiosInstance for the POST request
      const response = await axiosInstance.post(`${axiosInstance.defaults.baseURL}/auth/login`, {
        username,
        password,
      });

      // Check if the request was successful
      if (response.status === 200) {
        setUser(username);
        setIsLoggedIn(true);
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response && err.response.data) {
        const data = err.response.data as ErrorResponse; // Type assertion
        setError(data.error || "Login failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          <span className="text-[#FAAD66]">Log in</span> to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none text-gray-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-black-400 focus:outline-none focus:ring-[#FAAD66] focus:border-[#FAAD66]  sm:text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FAAD66] focus:border-[#FAAD66] sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F24B5B] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FAAD66]"
              >
                Log in
              </button>
              <p className="text-slate-600 text-center mt-2">
                New user?{" "}
                <Link href="/register" className="text-[#FAAD66] font-bold">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
