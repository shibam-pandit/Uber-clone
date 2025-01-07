import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";

function CaptainLogout() {
    const { setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`);
                if (response.status === 200) {
                    localStorage.removeItem("captain");
                    setCaptain(null); // Clear captain data in context
                    navigate("/captain-login"); // Navigate to login after successful logout
                }
            } catch (error) {
                alert("Error logging out. Please try again.");
            }
        };

        performLogout();
    }, [navigate, setCaptain]); // Dependencies for `useEffect`

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default CaptainLogout;