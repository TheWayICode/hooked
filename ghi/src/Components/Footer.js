import React from "react";
import { Link } from "react-router-dom";
import { FaGithubSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bottom-0 w-full bg-[#000000]">
      <div className="p-5 max-w-[1240px] mx-auto px-4 gap-8 grid lg:grid-cols-4">
        <div className="">
          <Link to="/" className="w-full text-3xl font-bold text-[#fff] ">
            <h1>HOOKED.</h1>
          </Link>
          <p className="text-[#00df9a] text-sm py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>
          <div className="flex justify-between md:w-[50%] my-2">
            <FaGithubSquare size={30} color="white" />
            <FaInstagram size={30} color="white" />
            <FaTwitterSquare size={30} color="white" />
          </div>
        </div>
        <div className="lg:col-span-3 flex justify-between mx-8">
          <div>
            <h6 className="text-white font-medium py-2">Support</h6>
            <ul className="text-white">
              <li className="py-2 text-sm"><a href="https://gitlab.com/hooked2/module3-project-gamma" target="_blank" rel="noopener noreferrer">Gitlab Repository</a></li>
              <li className="py-2 text-sm">Technologies</li>
              <li className="py-2 text-sm">Complaints</li>
              <li className="py-2 text-sm">Report</li>
            </ul>
          </div>
          <div>
            <h6 className="text-white font-medium py-2">Community</h6>
            <ul className="text-white">
              <li className="py-2 text-sm"><Link to="/login/signup">Join Today!</Link></li>
              <li className="py-2 text-sm"><Link to="/users">Access Account</Link></li>
              <li className="py-2 text-sm">Forgot Username?</li>
              <li className="py-2 text-sm">Forgot Password?</li>
              <li className="py-2 text-sm">Report Post</li>
            </ul>
          </div>
          <div>
            <h6 className="text-white font-medium py-2">Company</h6>
            <ul className="text-white">
              <li className="py-2 text-sm">
                <Link to="/aboutus">About Us</Link>
              </li>
              <li className="py-2 text-sm">Contact Us</li>
              <li className="py-2 text-sm">Location</li>
              <li className="py-2 text-sm">The Team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
