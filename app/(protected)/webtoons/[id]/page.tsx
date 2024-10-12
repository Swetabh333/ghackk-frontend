"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/apis/axiosInstance";
import Webtoondetail from "@/app/_components/Webtoondetail";
import Comments from "@/app/_components/comments";

interface Webtoon {
  _id: string;
  Name: string;
  Creator: string;
  Genre: string;
  short_description: string;
  img_url: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [webtoon, setWebtoon] = useState<Webtoon>();
  useEffect(() => {
    try {
      axiosInstance.get(`/webtoons/custom/${params.id}`).then((res) => {
        setWebtoon(res.data.message);
      });
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);
  if (!webtoon) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-center">
      <Webtoondetail webtoon={webtoon} />
      <Comments webtoonId={params.id} />
    </div>
  );
};

export default Page;
