import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserDataContext } from "../context/userContext";

const UserProtectWrapper = ({ children }) => {
    const { user, loading } = useContext(UserDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Wait until loading is complete to decide
        if (!loading && (!user || !user.email)) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    // If loading, show a spinner or null (placeholder)
    if (loading) {
        return <div>Loading...</div>; // Replace with a spinner if desired
    }

    // If user is logged in, render the children
    return <>{children}</>;
};

export default UserProtectWrapper;
