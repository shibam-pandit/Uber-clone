import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function UserLogout() {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`);
        if (response.status === 200) {
          localStorage.removeItem("user");
          setUser(null); // Clear user data in context
          navigate("/login"); // Navigate to login after successful logout
        }
      } catch (error) {
        localStorage.removeItem("user");
        setUser(null); // Clear user data in context
        navigate("/login"); // Navigate to login after successful logout
        console.log(error.response?.data?.errors?.[0]?.msg || "Logout failed.");
      }
    };

    performLogout();
  }, [navigate, setUser]); // Dependencies for `useEffect`

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default UserLogout;