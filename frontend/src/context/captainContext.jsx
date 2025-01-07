import React, { createContext, useState, useEffect } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Load user data from localStorage on component mount
        const savedCaptain = JSON.parse(localStorage.getItem("captain"));
        if (savedCaptain) {
            setCaptain(savedCaptain);
        }
        setLoading(false); // Loading complete
    }, []);

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain, loading }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
