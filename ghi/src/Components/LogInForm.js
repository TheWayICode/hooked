import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "@galvanize-inc/jwtdown-for-react";
import { LogoutNav } from "./NavLog/LoggedOutNav";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checker, setChecker] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const { login } = useAuthContext();

  const handleInvalid = () => {
    setInvalid(true);
  };

  const handleChecker = () => {
    setChecker(!checker);
  };

  const fetchUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data === null) {
        handleInvalid();
        console.log("error");
      } else {
        navigate("/searchpage");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    fetchUser();
  };

  useEffect(() => {
    login(username, password);
  }, [checker]);

  return (
    <>
      <LogoutNav />
      <div className="min-h-screen flex justify-center items-center mt-[-86px] bg">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onMouseOver={handleChecker}
                className="bg-[#05bd83] hover:bg-[#009767] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="w-full text-center pt-4">
              {invalid ? (
                <div className="w-full bg-[#ffa3a9] rounded-md border border-gray-500 p-4 inline-block">
                  <div className="text-[#a3000b]">
                    Invalid email or password
                  </div>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
