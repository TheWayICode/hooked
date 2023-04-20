import React from "react";
import Typed from "react-typed";
import InfoCard from "./InfoCard";
import Newsletter from "./Newsletter";
import { Link } from "react-router-dom";
import { LogoutNav } from "./NavLog/LoggedOutNav";

const Hero = () => {
  return (
    <>
      <LogoutNav />
      <div className="text-white pb-5 bg ">
        <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center ">
          <p className="text-[#00df9a] text-xl font-bold">MODERN DAY FISHING</p>
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-1">
            Fish smarter.
          </h1>
          <div className="flex justify-center items-center">
            <p className="md:text-4xl sm:text-3xl text-xl font-bold">
              Find fishing&nbsp;
            </p>
            <Typed
              className="md:text-4xl sm:text-3xl text-xl font-bold text-[#00df9a]"
              strings={["locations", "techniques", "communities"]}
              typeSpeed={60}
              backSpeed={80}
              loop
            />
          </div>
          <div>
            <p className="md:text-xl text-l font-medium py-2 text-[#ffffff]">
              Plan your next adventure with community built databases.
            </p>
          </div>

          <button className="bg-[#05bd83] w-[150px] rounded-md font-medium my-3 mx-auto py-3 hover:bg-[#009767]">
            <Link to="/signup">Get Started</Link>
          </button>
        </div>
      </div>
      <InfoCard />
      <Newsletter />
    </>
  );
};

export default Hero;
