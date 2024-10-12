import React from "react";
import Link from "next/link";

const MenuOverlay = () => {
  return <ul className="z-20 flex flex-col py-4 items-center md:hidden">
	          <li className="text-slate-600 hover:text-[#FAAD66]">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-slate-600 hover:text-[#FAAD66]">
            <Link href={"/favourites"}>Favourites</Link>
          </li>

	</ul>
;
};

export default MenuOverlay;
