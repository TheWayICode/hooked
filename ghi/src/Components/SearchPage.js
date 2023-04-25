import React, { useState } from "react";
import image from "./assets/boatofpeople.jpg";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import AllTripCard from "./searchPageInfoCards/allTripCard";
import SubmitStory from "./searchPageInfoCards/submitStory";
import NewsUpdate from "./searchPageInfoCards/newsUpdate";
import { allStates } from "../allStates";
import { LoggedNav } from "./NavLog/LoggedNav";

const SearchPage = () => {
  const style = {
    backgroundImage: `url(${image})`,
    backgroundPosition: "39% 61%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
  };

  window.addEventListener("load", () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  });

  const navigate = useNavigate();
  const { token } = useToken();
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  if (!token) {
    navigate("/login");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/locationlist/${input}`);
  };

  return (
    <>
      <LoggedNav />
      <div
        className="w-full h-screen relative mt-[-80px] bg-white"
        style={style}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-gray-900/50"></div>
        <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center">
          <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold text-white">
            Your adventure awaits
          </h1>
          <h2 className="md:text-xl sm:text-lg text-sm font-bold p-3 text-white">
            Find locations with our{" "}
            <span className="text-[#00df9a]">
              community supported database.
            </span>
          </h2>
          <form
            className="flex items-center justify-between max-w-[270px] md:max-w-[270px] sm:max-w-[270px] mx-auto w-full border rounded-md p-1 bg-white"
            onSubmit={handleSearch}
          >
            <div>
              <select
                className="p-2"
                value={input}
                onChange={handleInputChange}
              >
                {allStates.map((state) => {
                  return (
                    <option key={state.label} value={state.label}>
                      {state.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <button className="px-3 py-2 rounded-md text-white font-medium bg-[#05bd83] hover:bg-[#009767]">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <NewsUpdate />
      <SubmitStory />
      <AllTripCard />
    </>
  );
};

export default SearchPage;
