import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export const LogoutNav = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="sticky top-0 z-10 bg-[#0000005f] backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white">
        <h1>
          <span className="border-red-800">
            <Link to="/" className="w-full text-5xl font-bold text-[#fff]">
              HOOKED.
            </Link>
          </span>
        </h1>
        <div
          onClick={handleNav}
          className="md:hidden pt-2 flex justify-end pr-5"
        >
          <AiOutlineMenu size={30} />
        </div>
        <ul className="md:flex hidden">
          <Link
            to="/login"
            className="p-4 font-bold text-xl hover:text-[#2ddfb8]"
          >
            Login
          </Link>
          <Link
            to="signup"
            className="p-4 font-bold text-xl hover:text-[#29b798] text-[#2ddfb8]"
          >
            Register
          </Link>
        </ul>
        <div
          className={
            nav
              ? "md:hidden fixed top-0 right-0 w-[40%] h-full bg-[#000] ease-in-out duration-500 transition-all"
              : "hidden"
          }
        >
          <div
            onClick={handleNav}
            className="md:hidden flex justify-end pr-11 pt-7"
          >
            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </div>
          <ul className="bg-[#000] h-screen pl-5">
            <li className="pt-4 p-2 font-bold text-xl hover:text-[#2ddfb8]">
              <Link to="/login">Login</Link>
            </li>
            <li className="p-2 font-bold text-xl hover:text-[#29b798] text-[#2ddfb8]">
              <Link to="signup">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
