import React from "react";
import image from "../assets/news.png";
import { Link } from "react-router-dom";

const NewsUpdate = () => {
  return (
    <div className="w-full bg-[#00df9a] pb-10 pt-3 px-4">
      <div className="max-w-[1240px] mx-auto">
        <h1 className="md:text-5xl sm:text-4xl text-3xl text-black font-bold py-4 pb-6">
          Recent Events & Fishing News
        </h1>
        <div className="flex justify-between items-center gap-12">
          <div className="max-w-[400px] max-h-[800px] mx-auto">
            <img src={image} alt="newspic" />
            <h1 className="md:text-2xl sm:text-xl text-l font-bold pt-3">
              Shark Found in Big Lake
            </h1>
            <p className="md:text-base text-sm py-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link
              to="/news"
              className="hover:text-[#fff] md:text-sm text-xs font-bold"
            >
              Read More &gt;&gt;
            </Link>
          </div>
          <div className="max-w-[400px] m-auto">
            <img src={image} alt="newspic" />
            <h1 className="md:text-2xl sm:text-xl text-l font-bold pt-3">
              Fish Bait Prices Increase
            </h1>
            <p className="md:text-base text-sm py-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link
              to="/news"
              className="hover:text-[#fff] md:text-sm text-xs font-bold"
            >
              Read More &gt;&gt;
            </Link>
          </div>
          <div className="max-w-[400px] m-auto">
            <img src={image} alt="newspic" />
            <h1 className="md:text-2xl sm:text-xl text-l font-bold pt-3">
              Fishing Tiktok Goes Viral
            </h1>
            <p className="md:text-base text-sm py-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link
              to="/news"
              className="hover:text-[#fff] md:text-sm text-xs font-bold"
            >
              Read More &gt;&gt;
            </Link>
          </div>
          {/* <div className="max-w-[400px] m-auto">
            <img src={image} alt="newspic" />
            <h1 className="md:text-2xl sm:text-xl text-l font-bold pt-3">
              5-Minute Tilapia Recipe
            </h1>
            <p className="md:text-base text-sm py-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link
              to="/news"
              className="hover:text-[#fff] md:text-sm text-xs font-bold"
            >
              Read More &gt;&gt;
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NewsUpdate;
