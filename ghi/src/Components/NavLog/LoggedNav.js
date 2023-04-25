import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export const LoggedNav = () => {
  const navigate = useNavigate();
  const { logout } = useToken();

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    handleNav();
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
            <Link to="/searchpage">Search</Link>
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">
            <Link to="/guides">Guides</Link>
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">
            <Link to="/forum">Forum</Link>
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#2ddfb8]">
            <Link to="/users">Profile</Link>
          </li>
          <li className="p-4 font-bold text-xl hover:text-[#29b798] text-[#2ddfb8]">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        <div
          onClick={handleNav}
          className="md:hidden pt-2 flex justify-end pr-1"
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
          <div onClick={handleNav} className="flex justify-end pr-4 pt-7">
            <AiOutlineClose size={30} />
          </div>
          <ul className="bg-[#000] h-screen pl-3">
            <li className="p-2 font-bold text-xl hover:text-[#2ddfb8]">
              <Link to="/searchpage" onClick={handleNav}>
                Search
              </Link>
            </li>
            <li className="p-2 font-bold text-xl hover:text-[#2ddfb8]">
              <Link to="/guides" onClick={handleNav}>
                Guides
              </Link>
            </li>
            <li className="p-2 font-bold text-xl hover:text-[#2ddfb8]">
              <Link to="/forum" onClick={handleNav}>
                Forum
              </Link>
            </li>
            <li className="p-2 font-bold text-xl hover:text-[#2ddfb8]">
              <Link to="/users" onClick={handleNav}>
                Profile
              </Link>
            </li>
            <li className="p-2 font-bold text-xl hover:text-[#29b798] text-[#2ddfb8]">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
