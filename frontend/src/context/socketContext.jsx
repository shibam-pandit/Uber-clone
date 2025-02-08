import io from 'socket.io-client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_API_URL}`, {
    transports: ['websocket', 'polling']
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err.message);
        });
        
        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });
    }, []);

    const sendMessage = (eventName, message) => {
        socket.emit(eventName, message);
    };

    const recieveMessage = (eventName, callback) => {
        console.log('Listening for:', eventName);
        
        socket.on(eventName, callback);
        
        return () => {
            console.log('Removing listener for:', eventName);
            
            socket.off(eventName, callback); // Cleanup function to remove listener
        };
    };

    return (
        <SocketContext.Provider value={{sendMessage, recieveMessage}} >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;