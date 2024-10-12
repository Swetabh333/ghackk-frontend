import React from "react";
import Link from "next/link";

interface MenuOverlayProps {
  handleLogOut: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ handleLogOut }) => {
  return (
    <ul className="z-20 flex flex-col py-4 items-center md:hidden gap-4">
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
  );
};

export default MenuOverlay;
