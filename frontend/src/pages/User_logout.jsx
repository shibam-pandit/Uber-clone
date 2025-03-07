import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";

function UserLogout() {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Ensure cookies are included in the request
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/logout`
        );

        if (response.status === 200) {
          // Clear user data and navigate to login
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
        }
      } catch (error) {
        console.error(
          error.response?.data?.errors?.[0]?.msg || "Logout failed."
        );
      }
    };

    performLogout();
  }, [navigate, setUser]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default UserLogout;
