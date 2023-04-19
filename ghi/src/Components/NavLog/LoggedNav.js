import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export const LoggedNav = () => {
  const navigate = useNavigate();
  const { logout } = useToken();

  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-10 bg-[#0000005f] backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white">
        <h1>
          <span className="border-red-800">
            <Link
              to="/searchpage"
              className="w-full text-5xl font-bold text-[#fff]"
            >
              HOOKED.
            </Link>
          </span>
        </h1>

        <ul className="md:flex hidden">
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">
            <a href="/searchpage">Search</a>
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">
            <a href="/guides">Guides</a>
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">
            <a href="/forum">Forum</a>
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">
            <a href="/users">Profile</a>
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#29b798] text-[#2ddfb8]">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        <div
          onClick={handleNav}
          className="md:hidden pt-2 flex justify-end pr-5"
        >
          <AiOutlineMenu size={30} />
        </div>
        <div
          className={
            nav
              ? "fixed top-0 right-0 w-[40%] h-full bg-[#000] ease-in-out duration-500 transition-all"
              : "hidden"
          }
        >
          <div onClick={handleNav} className="flex justify-end pr-11 pt-7">
            <AiOutlineClose size={30} />
          </div>
          <ul className="bg-[#000] h-screen pl-3">
            <li className="p-4 font-bold text-2xl hover:text-[#2ddfb8]">
              <a href="/searchpage">Search</a>
            </li>
            <li className="p-4 font-bold text-2xl hover:text-[#2ddfb8]">
              <a href="/guides">Guides</a>
            </li>
            <li className="p-4 font-bold text-2xl hover:text-[#2ddfb8]">
              <a href="/forum">Forum</a>
            </li>
            <li className="p-4 font-bold text-2xl hover:text-[#2ddfb8]">
              <a href="/users">Profile</a>
            </li>
            <li className="p-4 font-bold text-2xl hover:text-[#29b798] text-[#2ddfb8]">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
