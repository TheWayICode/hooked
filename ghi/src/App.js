import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import NavBar from "./Components/Navbar";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LogInForm";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Guide from "./Components/Guide";
import SearchPage from "./Components/SearchPage";
import LocationList from "./Components/LocationList";
import PostList from "./Components/PostList";
import UserProfile from "./Components/UserProfile";
import PostForm from "./Components/PostForm";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/guides" element={<Guide />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/locationlist/:data" element={<LocationList />} />
          <Route path="/users" element={<UserProfile />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
