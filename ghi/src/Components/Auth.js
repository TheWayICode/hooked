import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Auth() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { token, register, login } = useToken();

  // useEffect(() => {
  //   if (token) {
  //     navigate("/my-list");
  //   }
  // }, [token]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isSignIn = location.pathname.includes("signin");

  const handleSubmit = () => {
    if (isSignIn) {
      login(formData.name, formData.email, formData.password);
    } else {
      register(formData, `${process.env.REACT_APP_HOOKED_API_HOST}/api/users`);
    }
  };

  const { name = "", email = "", password = "" } = formData;
  return token ? null : (
    <div>
      <ul>
        <li>
          name{" "}
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleFormChange}
          />
        </li>
        <li>
          email{" "}
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleFormChange}
          />
        </li>
        <li>
          password{" "}
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleFormChange}
          />
        </li>
      </ul>
      <button onClick={handleSubmit}>{isSignIn ? "Sign in" : "Sign up"}</button>
    </div>
  );
}

export default Auth;
