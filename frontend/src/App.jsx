import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/start";
import UserSignUp from "./pages/user_signup";
import UserLogin from "./pages/user_login";
import UserLogout from "./pages/User_logout";
import Home from "./pages/home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainSignup from "./pages/captain_signup";
import CaptainLogin from "./pages/captain_login";
import CaptainLogout from "./pages/captain_logout";
import CaptainHome from "./pages/captain_home";
import CaptainRiding from "./pages/CaptainRiding";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Riding from "./pages/Riding";
import UserProfile from "./pages/User_profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CaptainProfile from "./pages/Captain-Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<UserSignUp />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-register" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route path="/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route path="/captain-logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
        <Route path="/riding/:rideId"
          element={
            <UserProtectWrapper>
              <Riding />
            </UserProtectWrapper>
          }
        />
        <Route path="/captain-riding/:rideId"
          element={
            <CaptainProtectWrapper>
              <CaptainRiding />
            </CaptainProtectWrapper>
          }
        />

        <Route path="/profile"
          element={
            <UserProtectWrapper>
              <UserProfile />
            </UserProtectWrapper>
          }
        />
        <Route path="/captain-profile"
          element={
            <CaptainProtectWrapper>
              <CaptainProfile />
            </CaptainProtectWrapper>
          }
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;