import React from "react";

const Newsletter = () => {
  return (
    <div className="bg-[#00df9a] w-full py-16">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 px-4 flex flex-col justify-center mb-6">
          <h1 className="text-white md:text-4xl font-bold sm:text-3xl text-2xl py-2">
            Want updates on the newest fishing news?
          </h1>
          <p className="text-white">
            Sign up for our newsletter and stay updated.
          </p>
        </div>
        <div className="my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full px-2">
            <input
              type="email"
              placeholder="Email"
              className="bg-[#fff] rounded-md p-2 w-full flex"
            />
            <button className="bg-[#000000] w-[150px] rounded-md font-medium my-6 mx-auto py-2 text-white hover:bg-[#272626] ml-3">
              Notify Me
            </button>
          </div>
          <p className="ml-2 flex flex-col">
            We care about the protection of your data. Read our
            <span className="text-[#fff]">Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
