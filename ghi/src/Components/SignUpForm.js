import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;
    data.email = email;
    data.password = password;

    const userUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/users`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(userUrl, fetchConfig);
    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center mt-[-86px] bg">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">
          Join the HOOKED community!
        </h1>
        <form onSubmit={handleSubmit} id="new-user">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleNameChange}
              placeholder="John Doe"
              required
              type="text"
              name="name"
              value={name}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleEmailChange}
              placeholder="example@email.com"
              required
              type="text"
              name="email"
              value={email}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handlePasswordChange}
              placeholder="********"
              required
              type="password"
              name="password"
              value={password}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-[#05bd83] hover:bg-[#009767] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <p className="text-sm font-medium text-[#000000] hover:text-[#05bd83]">
              <Link to="/login">Already a member?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
