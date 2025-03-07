import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserDataContext } from "../context/userContext";

const UserProtectWrapper = ({ children }) => {
    const { user, loading, token } = useContext(UserDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Wait until loading is complete to decide
        if (!loading && (!user)) {
            navigate("/login");
        }
    }, [user, loading, token, navigate]);

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

export default UserProtectWrapper;
