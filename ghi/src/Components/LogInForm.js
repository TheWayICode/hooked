import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Login() {
  const { login, token } = useToken();
  console.log("Token from local storage:", token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);

    const data = {};
    data.email = email;
    data.password = password;

    const userUrl = `${process.env.REACT_APP_HOOKED_API_HOST}/api/users`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await fetch(userUrl, fetchConfig);
    if (response.ok) {
      const responseData = await response.json();
      const fetchedToken = responseData.token;
      console.log("Fetched token:", fetchedToken);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} id="new-user">
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
              placeholder="email"
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
              placeholder="password"
              required
              type="password"
              name="password"
              value={password}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
