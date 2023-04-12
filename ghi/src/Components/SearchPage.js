import React from "react";
import image from "./assets/boatofpeople.jpg";

const SearchPage = () => {
  const style = {
    backgroundImage: `url(${image})`,
    backgroundPosition: "39% 61%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
  };
  return (
    <div className="w-full h-screen relative mt-[-80px] bg-white" style={style}>
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/50"></div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center">
        <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold text-white">
          Your adventure awaits
        </h1>
        <h2 className="md:text-lg sm:text-base text-xs font-bold p-3 text-white">
          Find locations with our{" "}
          <span className="text-[#00df9a]">community supported database.</span>
        </h2>
        <form className="flex items-center justify-between max-w-[400px] md:max-w-[600px] sm:max-w-[500px] mx-auto w-full border rounded-md p-1 bg-white ">
          <div>
            <input
              className="bg-transparent w-[300px] sm:w-[400px] focus:outline-none pl-1 "
              type="text"
              placeholder="Search Locations"
            />
          </div>
          <div>
            <button className="px-3 py-2 rounded-md text-white font-medium bg-[#05bd83] hover:bg-[#009767]">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
