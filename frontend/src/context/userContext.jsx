import React, { createContext, useState, useEffect } from "react";

// Create a context
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize user as null
    const [loading, setLoading] = useState(true); // Track loading state
    const [token, setToken] = useState(null); // Initialize token as null

    useEffect(() => {
        // Load user data from localStorage
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            setUser(savedUser);
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
        <UserDataContext.Provider value={{ user, setUser, loading, token }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;
