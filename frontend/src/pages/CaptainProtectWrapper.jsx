import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import {CaptainDataContext} from "../context/captainContext"

const CaptainProtectWrapper = ({ children }) => {
    const { captain, loading } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Wait until loading is complete to decide
        if (!loading && !captain ) {
            navigate("/captain-login");
        }
    }, [captain, loading, navigate]);

    // If loading, show a spinner or null (placeholder)
    if (loading) {
        return <div>Loading...</div>; // Replace with a spinner if desired
    }

    // If user is logged in, render the children
    return <>{children}</>;
};

export default CaptainProtectWrapper;
