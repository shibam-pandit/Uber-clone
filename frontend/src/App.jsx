import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import UserSignUp from "./pages/user_signup";
import UserLogin from "./pages/user_login";
import CaptainSignup from "./pages/captain_signup";
import CaptainLogin from "./pages/captain_login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserSignUp />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-register" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
      </Routes>
    </div>
  );
}

export default App;