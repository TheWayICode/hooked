import React from "react";
import Typed from "react-typed";

const Hero = () => {
  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] text-2xl font-bold">MODERN DAY FISHING</p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-1">
          Fish smarter.
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold md:py-2">
            Find fishing&nbsp;
          </p>
          <Typed
            className="md:text-5xl sm:text-4xl text-xl font-bold md:py-4 text-[#00df9a]"
            strings={["locations", "techniques", "communities"]}
            typeSpeed={60}
            backSpeed={80}
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
