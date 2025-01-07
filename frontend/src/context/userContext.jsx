import React, { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Load user data from localStorage on component mount
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false); // Loading complete
    }, []);

    return (
        <UserDataContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;
