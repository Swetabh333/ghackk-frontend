"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import axiosInstance from "@/app/apis/axiosInstance";
import Link from "next/link";

interface Webtoon {
  _id: string;
  Name: string;
  Creator: string;
  Genre: string;
  short_description: string;
  img_url: string;
}

const Page = () => {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the webtoon data using axios
    const fetchWebtoons = async () => {
      try {
        const response = await axiosInstance.get(`/webtoons/popular`);
        setWebtoons(response.data.message); // assuming your API returns { message: [...] }
      } catch (error) {
        setError("An error occurred while fetching the webtoons. " + error);
      }
    };

    fetchWebtoons();
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-4xl font-bold mb-6">Top 10 Most Popular Webtoons</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {webtoons.map((webtoon, index) => (
          <Card key={index} className="p-4 flex flex-col">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={webtoon.img_url}
                alt={webtoon.Name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h3 className="text-xl font-bold hover:text-[#FAAD66]">
              <Link href={"/webtoons/" + webtoon._id}>{webtoon.Name}</Link>
            </h3>
            <p className="text-sm text-gray-500">Creator : {webtoon.Creator}</p>
            <p className="text-sm text-gray-500">Genre : {webtoon.Genre}</p>
            <p className="text-sm text-gray-700 mt-2">
              {webtoon.short_description}
            </p>
            <button
              className="bg-[#F24B5B] p-3 rounded-md mt-2 text-white hover:opacity-80"
              //  onClick={addToFavourite}
            >
              Add to Favourites
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
