import React, { createContext, useState, useEffect } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Track loading state
    const [token, setToken] = useState(null); // Initialize token as null

    useEffect(() => {
        // Load user data from localStorage on component mount
        const savedCaptain = JSON.parse(localStorage.getItem("captain"));
        if (savedCaptain) {
            setCaptain(savedCaptain);
        }

        // Check if there's a 'token' cookie
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));

        if (tokenCookie) {
            setToken(tokenCookie.split('=')[1]); // Extract token value
        }

        setLoading(false); // Loading complete
    }, []);

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain, loading, token }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
