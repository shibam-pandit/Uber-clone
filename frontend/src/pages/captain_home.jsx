// Import necessary libraries
import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import CaptainNavbar from "../captain-components/Captain_Navbar";
import RideRequest from "../captain-components/RideRequest";
import { CaptainDataContext } from "../context/captainContext";
import { SocketContext } from "../context/socketContext";

const CaptainHome = () => {

  const { captain } = useContext(CaptainDataContext);
  const { sendMessage } = useContext(SocketContext);

  // connection with socket
  useEffect(() => {
    sendMessage('join', { userEmail: captain.email, userType: 'captain' });
  }, []);

  const [rideRequestsshow, setRideRequestsshow] = useState(false)

  useEffect(() => {  
    if (!rideRequestsshow) {
      return;
    }
  
    if (!captain?.email) {
      return;
    }
  
    let intervalId;
  
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          sendMessage("captain-update-location", { email: captain.email, latitude, longitude });
        },
        (error) => {
          alert("Problem fetching location.", error.message);
          console.error("Geolocation error:", error)
        } 
      );
    };
  
    updateLocation(); // Send first update immediately
    intervalId = setInterval(updateLocation, 10000); // Update every 10s
  
    return () => clearInterval(intervalId);
  }, [rideRequestsshow, captain?.email]); // Depend on rideRequestsshow & captain.email


  const handleGoOnline = () => {
    setRideRequestsshow(true);

  };

  return (
    <div className="min-h-screen bg-[#f2e9db] font-sans">
      {/* Navbar */}
      <CaptainNavbar />

      {/* Main Content */}
      <div className="relative container mx-auto py-20 px-6 md:px-12">
        {!rideRequestsshow && (<motion.div
          className="bg-gradient-to-r from-[#4550f5] to-[#0a3d79] text-gray-200 rounded-lg shadow-md p-8 mb-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-500 font-semibold text-base absolute top-2 right-2">⚫ Offline</p>
          <h1 className="text-4xl font-bold mb-4">Welcome, Captain {captain?.firstname || ''}!</h1>
          <p className="text-lg">Drive safely and earn big! Check your stats, rides, and more below.</p>
          <button
            onClick={handleGoOnline}
            className="mt-6 bg-gray-200 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            Go Online
          </button>

        </motion.div>)}

        {rideRequestsshow && (<motion.div
          className="bg-[#e7c9a5] text-white rounded-lg shadow-md px-5 py-8 lg:p-10 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <>
            <p className="text-green-600 font-semibold text-base absolute top-4 right-2">🟢 Online</p>
            <button
              className="text-base text-blue-700 rounded-lg font-semibold hover:bg-blue-100 active:bg-blue-100 p-2 absolute top-4 left-2"
              onClick={() => setRideRequestsshow(false)}
            >
              Turn on Offline mode
            </button>

            <RideRequest />
          </>

        </motion.div>)}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Section */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-800">Today</h3>
            <p className="text-2xl text-blue-600 font-bold">5 Rides</p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-800">Earnings</h3>
            <p className="text-2xl text-green-600 font-bold">$120</p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-800">Rating</h3>
            <p className="text-2xl text-yellow-500 font-bold">4.8</p>
          </motion.div>
        </div>

        {/* Ride Requests */}

      </div>
    </div>
  );
};

export default CaptainHome;
