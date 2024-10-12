import Image from "next/image";

interface Webtoon {
  _id: string;
  Name: string;
  Creator: string;
  Genre: string;
  short_description: string;
  img_url: string;
}

const Webtoondetail = ({ webtoon }: { webtoon: Webtoon }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl md:text-6xl font-extrabold">{webtoon.Name}</h1>
      <Image
        src={webtoon.img_url}
        alt={webtoon.Name}
        width={700}
        height={700}
      />
      <div className="text-3xl font-bold">
        <p>Author: {webtoon.Creator}</p>
        <p>Genre: {webtoon.Genre}</p>
      </div>
      <p className="container text-xl text-slate-600 text-center">
        {webtoon.short_description}
      </p>
    </div>
  );
};

export default Webtoondetail;
