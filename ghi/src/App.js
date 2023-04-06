import './App.css';
import { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import Auth from './Components/Auth';

function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_HOOKED_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])



  // const { token } = useContext(AuthContext);
  // const user = useUser(token);
  // const { logout } = useToken();
  return (
    <div>
      <div>
        {/* {token ? (
          // If yes token, we're logged in
          <button onClick={logout}>sign out</button>
        ) : (
          // If no token, we want to log in
          <>
            <NavLink to="/signin">sign in</NavLink>
            <NavLink to="/signup">sign up</NavLink>
          </>
        )} */}
      </div>
      <Routes>
        <Route path="/" element={<Auth />}/>
      </Routes>
    </div>
  );
}

export default App;
