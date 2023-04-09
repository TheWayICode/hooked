import React from "react";
import { Link } from "react-router-dom";

export const LoggedNav = () => {
  return (
    <nav className="sticky top-0 z-10 bg-[#0000005f] backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white">
        <Link to="/" className="w-full text-5xl font-bold text-[#fff] ">
          <h1>HOOKED.</h1>
        </Link>
        <ul className="flex">
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">
            Locations
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">Guides</li>
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">Forum</li>
          <li className="p-4 font-bold text-xl hover:text-[#29b798] text-[#2ddfb8]">
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
