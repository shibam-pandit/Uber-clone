import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'remixicon/fonts/remixicon.css';
import axios from "axios";
import L from "leaflet";
import { SocketContext } from "../context/socketContext"; 

// Custom icons for markers
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Example user icon
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const captainIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Example captain icon
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function UserRiding() {
  const { rideId } = useParams();

  const [panelOpen, setPanelOpen] = useState(true);
  const [ride, setRide] = useState(null);
  // const [captainLocation, setCaptainLocation] = useState([22.500, 88.08]);
  const [userLocation, setUserLocation] = useState([22.505, 88.09]);
  const [destinationLocation, setDestinationLocation] = useState([22.505, 88.09]);
  const [eta, setEta] = useState("Calculating...");
  const { recieveMessage } = useContext(SocketContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        {
          enableHighAccuracy: true, // Improves accuracy
          timeout: 10000, // Wait 10 seconds before error
          maximumAge: 0, // No caching, always fetch fresh location
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to get user's real-time location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        {
          enableHighAccuracy: true, // Improves accuracy
          timeout: 10000, // Wait 10 seconds before error
          maximumAge: 0, // No caching, always fetch fresh location
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Fetch user location every 10 seconds
  useEffect(() => {
    getUserLocation();

    const interval = setInterval(() => {
      getUserLocation();
    }, 10000); // Updates every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  useEffect(() => {
    // Fetch ride details using rideId
    const fetchRide = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/rides/get-ride`, {
          params: { rideId },
          withCredentials: true
        });
        
        if (response.status === 200) {
          setRide(response.data);
        }
      } catch (error) {
        console.error("Error fetching ride:", error);
      }
    };

    fetchRide();
  }, []);

  useEffect(() => {
    const fetchDestinationCoords = async () => {
      if(!ride) 
        return;
      
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-coordinates`, {
          params: { address: ride.destination },
          withCredentials: true
        });
        if (response.status === 200) {
          setDestinationLocation([response.data?.lat || 22.505, response.data?.lon || 88.09]);
        }
      } catch (error) {
        console.error("Error fetching destination:", error);
      }
  };

  fetchDestinationCoords();
  }, [ride]);

  const navigate = useNavigate();
  useEffect(() => {
    recieveMessage("ride-ended", () => {
      navigate("/home");
    });
  }, []);

  // Function to toggle bottom panel
  const togglePanel = () => setPanelOpen(!panelOpen);

  return (
    <div className="relative h-screen w-full">
      {/* Large Screen Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Map Section (Left 2/3) */}
        <div className="w-2/3">
          <MapContainer
            center={userLocation}
            zoom={10}
            className="h-screen w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {/* User's Location Marker */}
            <Marker position={userLocation} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>

            {/* Destination Location Marker */}
            <Marker position={destinationLocation} icon={captainIcon}>
              <Popup>Destination</Popup>
            </Marker>

            {/* Captain's Location Marker */}
            {/* <Marker position={captainLocation} icon={captainIcon}>
              <Popup>Captain's Location</Popup>
            </Marker> */}
          </MapContainer>
        </div>

        {/* Details Section (Right 1/3) */}
        <div className="w-1/3 p-6 bg-gradient-to-r from-[#1E3A8A] to-[#9333EA] text-white overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Ride Details</h2>

          {/* Pickup & Destination */}
          <div className="mt-4">
            <h2 className="text-lg font-bold flex items-center">
              <i className="ri-map-pin-line text-yellow-400 mr-2"></i> Pickup:
            </h2>
            <p className="text-gray-200">{ride?.pickup || "Loading..."}</p>

            <h2 className="text-lg font-bold mt-3 flex items-center">
              <i className="ri-flag-checkered-line text-green-400 mr-2"></i> Destination:
            </h2>
            <p className="text-gray-200">{ride?.destination || "Loading..."}</p>
          </div>

          {/* Captain Details */}
          <div className="mt-6 flex items-center">
            <img
              src={ride?.captainImage || "https://via.placeholder.com/50"}
              alt="Captain"
              className="w-12 h-12 rounded-full border-2 border-white mr-3"
            />
            <div>
              <h2 className="text-lg font-bold">Captain: {ride?.captainName || "Unknown"}</h2>
              <p className="text-gray-200">{ride?.vehicleModel || "Vehicle Details"}</p>
            </div>
          </div>

          {/* Ride Status */}
          <div className="mt-4">
            <h2 className="text-lg font-bold">Estimated Arrival:</h2>
            <p className="text-yellow-300 text-xl font-semibold">{eta}</p>
          </div>

          {/* Ride Actions */}
          <div className="mt-6 flex justify-between">
            {/* <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/2 mx-1">
                            Cancel Ride
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2 mx-1">
                            Contact Captain
                        </button> */}
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mx-1">
              Make Payment
            </button>
          </div>
        </div>
      </div>

      {/* Small Screen Layout */}
      <div className="lg:hidden relative h-screen w-full">
        {/* Map Section */}
        <MapContainer
          center={userLocation}
          zoom={10}
          className="h-screen w-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {/* User's Location Marker */}
          <Marker position={userLocation} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Destination Location Marker */}
          <Marker position={destinationLocation} icon={captainIcon}>
            <Popup>Destination</Popup>
          </Marker>

          {/* Captain's Location Marker */}
          {/* <Marker position={captainLocation} icon={captainIcon}>
            <Popup>Captain's Location</Popup>
          </Marker> */}
        </MapContainer>

        {/* Bottom Panel for Mobile */}
        <motion.div
          className={`absolute bottom-0 w-full bg-gradient-to-r from-[#1E3A8A] to-[#9333EA] text-white p-4 
                    ${panelOpen ? "h-[60%]" : "h-16"} overflow-y-auto rounded-t-2xl shadow-lg`}
          style={{ zIndex: 1000 }}
          initial={{ y: "100%" }}
          animate={{ y: panelOpen ? "0%" : "calc(100% - 4rem)" }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          {/* Panel Header */}
          <div
            className="flex justify-between items-center cursor-pointer p-2"
            onClick={togglePanel}
          >
            <h3 className="text-xl font-bold">Ride Details</h3>
            <motion.div
              className="text-2xl"
              initial={{ rotate: 0 }}
              animate={{ rotate: panelOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {panelOpen ? <i className="ri-arrow-down-s-line"></i> : <i className="ri-arrow-up-s-line"></i>}
            </motion.div>
          </div>

          {/* Panel Content */}
          {panelOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "spring", stiffness: 50 }}>
              {/* Pickup & Destination */}
              <div className="mt-4">
                <h2 className="text-lg font-bold flex items-center">
                  <i className="ri-map-pin-line text-yellow-400 mr-2"></i> Pickup:
                </h2>
                <p className="text-gray-200">{ride?.pickup || "Loading..."}</p>

                <h2 className="text-lg font-bold mt-3 flex items-center">
                  <i className="ri-flag-checkered-line text-green-400 mr-2"></i> Destination:
                </h2>
                <p className="text-gray-200">{ride?.destination || "Loading..."}</p>
                <button className="mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2">
                  Make Payment
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default UserRiding;
