import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LogInForm";
import SantaMonicaPierDetails from "./Components/LocationDetails/SantaMonicaPier";
import LakeShastaDetails from "./Components/LocationDetails/LakeShasta";
import AdirondackMountainsDetails from "./Components/LocationDetails/AdirondackMountains";
import HudsonRiverDetails from "./Components/LocationDetails/HudsonRiver";
import LakeOkeechobeeDetails from "./Components/LocationDetails/LakeOkeechobee";
import LakeTexomaDetails from "./Components/LocationDetails/LakeTexoma";
import LakeTravisDetails from "./Components/LocationDetails/LakeTravis";
import SebagoLakeDetails from "./Components/LocationDetails/SebagoLake";
import MooseheadLakeDetails from "./Components/LocationDetails/MooseheadLake";
import FloridaKeysDetails from "./Components/LocationDetails/FloridaKeys";
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
              element={<SantaMonicaPierDetails />}
            />
            <Route
              path="AdirondackMountains"
              element={<AdirondackMountainsDetails />}
            />
            <Route path="HudsonRiver" element={<HudsonRiverDetails />} />
            <Route
              path="LakeOkeechobee"
              element={<LakeOkeechobeeDetails />}
            />
            <Route path="LakeShasta" element={<LakeShastaDetails />} />
            <Route path="LakeTexoma" element={<LakeTexomaDetails />} />
            <Route path="LakeTravis" element={<LakeTravisDetails />} />
            <Route path="MooseheadLake" element={<MooseheadLakeDetails />} />
            <Route path="SebagoLake" element={<SebagoLakeDetails />} />
            <Route path="FloridaKeys" element={<FloridaKeysDetails />} />
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
