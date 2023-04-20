import React from "react";
import { Link } from "react-router-dom";

const SubmitStory = () => {
  return (
    <div className="bg-[#040505] p-5">
      <div className="p-2">
        <h1 className="md:text-3xl text-2xl text-white text-center font-bold">
          Want to get featured on our headliner?{" "}
          <span>
            <Link
              to="/forum/new"
              className="text-[#31cd9c] hover:text-[#009767]"
            >
              Tell us your story!
            </Link>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default SubmitStory;
