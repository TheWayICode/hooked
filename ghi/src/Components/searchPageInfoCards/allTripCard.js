import React from "react";
import image from "../assets/campingcircle.png";

const AllTripCard = () => {
  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="text-[#00df9a] font-bold">
            ALL THE INFORMATION YOU NEED
          </p>
          <h1 className="md:text-3xl sm:text-2xl text-xl py-2 font-bold">
            Find All About Your Next Trip
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum velit esse
            cillum dolore quis nostrud exercitation ullamco laboris.
          </p>
        </div>
        <img className="w-[500px] mx-auto my-4" src={image} alt="techpic" />
      </div>
    </div>
  );
};

export default AllTripCard;
