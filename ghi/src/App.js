import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LogInForm";
import Santa_Monica_Pier_Details from "./Components/LocationDetails/SantaMonicaPier";
import Lake_Shasta_Details from "./Components/LocationDetails/LakeShasta";
import Adirondack_Mountains_Details from "./Components/LocationDetails/AdirondackMountains";
import Hudson_River_Details from "./Components/LocationDetails/HudsonRiver";
import Lake_Okeechobee_Details from "./Components/LocationDetails/LakeOkeechobee";
import Lake_Texoma_Details from "./Components/LocationDetails/LakeTexoma";
import Lake_Travis_Details from "./Components/LocationDetails/LakeTravis";
import Sebago_Lake_Details from "./Components/LocationDetails/SebagoLake";
import Moosehead_Lake_Details from "./Components/LocationDetails/MooseheadLake";
import Florida_Keys_Details from "./Components/LocationDetails/FloridaKeys";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Guide from "./Components/Guide";
import SearchPage from "./Components/SearchPage";
import LocationList from "./Components/LocationList";
import PostList from "./Components/PostList";
import UserProfile from "./Components/UserProfile";
import PostForm from "./Components/PostForm";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import FishRequestForm from "./Components/FishForm";

function App() {
  const { token } = useAuthContext();
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  if (token === null) {
    console.log("token is null");
  }

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`}
      >
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/locations">
            <Route
              path="SantaMonicaPier"
              element={<Santa_Monica_Pier_Details />}
            />
            <Route
              path="AdirondackMountains"
              element={<Adirondack_Mountains_Details />}
            />
            <Route path="HudsonRiver" element={<Hudson_River_Details />} />
            <Route
              path="LakeOkeechobee"
              element={<Lake_Okeechobee_Details />}
            />
            <Route path="LakeShasta" element={<Lake_Shasta_Details />} />
            <Route path="LakeTexoma" element={<Lake_Texoma_Details />} />
            <Route path="LakeTravis" element={<Lake_Travis_Details />} />
            <Route path="MooseheadLake" element={<Moosehead_Lake_Details />} />
            <Route path="SebagoLake" element={<Sebago_Lake_Details />} />
            <Route path="FloridaKeys" element={<Florida_Keys_Details />} />
          </Route>
          <Route path="/guides" element={<Guide />} />
          <Route path="/forum">
            <Route index element={<PostList />} />
            <Route path="new" element={<PostForm />} />
          </Route>
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/locationlist/:data" element={<LocationList />} />
          <Route path="/users" element={<UserProfile />} />
          <Route path="/fishreport" element={<FishRequestForm />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
