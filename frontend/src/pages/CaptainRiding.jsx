import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'remixicon/fonts/remixicon.css';
import FinishRide from "../captain-components/FinishRide";
import OTPInput from "../captain-components/OTPInput";
import axios from "axios";

function CaptainRiding() {
    const { rideId } = useParams();

    const [panelOpen, setPanelOpen] = useState(true); // Panel open by default for small screens
    const [finishRideShow, setFinishRideShow] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification
    const [ride, setRide] = useState({});

    useEffect(() => {
        // Fetch ride details using rideId
        const fetchRide = async () => {
            try {          
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/rides/get-ride`, {
                    params: { rideId },  // Pass as query parameter
                    withCredentials: true
                });
                if(response.status === 200) {
                    setRide(response.data);
                }
            } catch (error) {
                console.error("Error fetching ride:", error);
            }
        }

        fetchRide();
    }, []);

    const togglePanel = () => setPanelOpen(!panelOpen);

    return (
        <div className="relative h-screen w-full">
            {/* Large Screen Layout */}
            <div className="hidden lg:flex min-h-screen">
                {/* Map Section */}
                <div className="w-2/3">
                    <MapContainer
                        center={[22.505, 88.09]} // Replace with dynamic coordinates
                        zoom={13}
                        className="h-full w-full"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        />
                    </MapContainer>
                </div>

                {/* Panel Section */}
                <div className="w-1/3 p-8 bg-gradient-to-r from-[#052a55] to-[#13123fd7] text-white overflow-y-auto">
                    {!finishRideShow ? (
                        !otpVerified ? (
                            <>
                                <h2 className="text-2xl font-bold mb-[10%] p-2 border-b-2 border-gray-300">
                                    Pickup Location:<br /> <span className="text-yellow-400">{ride?.pickup || "pickup"}</span>
                                </h2>
                                {/* // OTP Verification Section */}
                                <div className="flex flex-col items-center">
                                    <h2 className="text-2xl font-bold text-gray-100 mb-4">Verify OTP</h2>
                                    <OTPInput
                                        rideId={ride.id}
                                        onSuccess={() => setOtpVerified(true)} // Update OTP verification state
                                    />
                                </div>
                            </>
                        ) : (
                            // Ride Information Section
                            <div>
                                <h2 className="text-2xl font-bold mb-[10%] p-2 border-b-2 border-gray-300">
                                    Drop Location:<br /> <span className="text-yellow-400 mt-3">{ride?.destination || "destination"}</span>
                                </h2>
                                {/* <ul className="list-disc list-inside space-y-2 text-gray-300">
                                    {directions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ul> */}
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
                                    onClick={() => setFinishRideShow(true)}
                                >
                                    Complete Ride
                                </button>
                            </div>
                        )
                    ) : (
                        // FinishRide Section (Full Panel)
                        <FinishRide />
                    )}
                </div>
            </div>

            {/* Small Screen Layout */}
            <div className="lg:hidden relative h-screen w-full">
                {/* Map Section */}
                <MapContainer
                    center={[22.505, 88.09]} // Replace with dynamic coordinates
                    zoom={13}
                    className={`h-screen w-full`}
                    style={{ zIndex: 1 }} // Ensure map stays behind the panel
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                </MapContainer>

                {/* Panel */}
                <motion.div
                    className={`absolute bottom-0 w-full bg-gradient-to-r from-[#052a55] to-[#13123fd7] text-white p-4 ${panelOpen ? "h-[70%]" : "h-16"} overflow-y-auto`}
                    style={{ zIndex: 50 }} // Ensure panel z-index is higher
                    initial={{ y: "100%" }}
                    animate={{ y: panelOpen ? "0%" : "calc(100% - 4rem)" }}
                    transition={{ type: "spring", stiffness: 50 }}
                >
                    {/* Panel Header */}
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={togglePanel}
                    >
                        <h3 className="text-xl font-bold">{otpVerified ? "Ride Details" : "Verify OTP"}</h3>
                        <motion.div
                            className="text-2xl"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: panelOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {panelOpen ? <i className="ri-arrow-up-double-line"></i> : <i className="ri-arrow-up-double-fill"></i>}
                        </motion.div>
                    </div>

                    {/* Panel Content */}
                    {panelOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }} // Fade-in effect for content
                            transition={{ type: "spring", stiffness: 50 }}
                        >
                            {!finishRideShow ? (
                                !otpVerified ? (
                                    // OTP Verification Section
                                    <div className="flex flex-col items-center mt-4">
                                        <OTPInput
                                            rideId={ride.id}
                                            onSuccess={() => setOtpVerified(true)} // Update OTP verification state
                                        />
                                    </div>
                                ) : (
                                    // Ride Information Section
                                    <div className="mt-4">
                                        <h2 className="text-xl font-bold mb-2">Drop Location:</h2>
                                        <p className="text-yellow-400 mb-4 text-2xl">{ride?.destination || ""}</p>
                                        {/* <ul className="list-disc list-inside space-y-2 mt-4 text-gray-300">
                                            {directions?.map((instruction, index) => (
                                                <li key={index}>{instruction}</li>
                                            ))}
                                        </ul> */}
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
                                            onClick={() => setFinishRideShow(true)}
                                        >
                                            Complete Ride
                                        </button>
                                    </div>
                                )
                            ) : (
                                // FinishRide Section (Full Panel)
                                <FinishRide />
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default CaptainRiding;
