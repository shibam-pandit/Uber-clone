import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import {CaptainDataContext} from "../context/captainContext"

const CaptainProtectWrapper = ({ children }) => {
    const { captain, loading, token } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Wait until loading is complete to decide
        if (!loading && (!captain) ) {
            navigate("/captain-login");
        }
    }, [captain, loading, token, navigate]);

    // If loading, show a spinner or null (placeholder)
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        ); // Replace with a spinner if desired
    }

    // If user is logged in, render the children
    return <>{children}</>;
};

export default CaptainProtectWrapper;
