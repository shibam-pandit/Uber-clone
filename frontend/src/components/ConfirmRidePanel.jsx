import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RideInfo from "./RideInfo";
import { SocketContext } from "../context/socketContext.jsx";
import axios from "axios";

function ConfirmRidePanel(props) {

    const { setConfirmRidePanelShow, img, pickup, destination, fare, vehicle } = props;

    const [lookingForDriver, setLookingForDriver] = useState(false);
    const [rideInfoShow, setRideInfoShow] = useState(false);
    const [acceptedCaptain, setAcceptedCaptain] = useState({});
    const navigate = useNavigate();

    const { recieveMessage } = useContext(SocketContext);

    const confirmRideHandler = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/create`, {
                pickup,
                destination,
                vehicleType: vehicle,
                fare,
            }, {
                withCredentials: true,
            }
            );

            if (response.status === 201) {
                setLookingForDriver(true);
            }

        } catch (error) {
            console.error("Error creating ride:", error.message);
            if (error.response.status === 401) {
                navigate("/login");
            }
            alert("Error creating ride. Please try again.");
        }
    };

    useEffect(() => {
        const handleRideRequest = async (rideData) => {
            console.log("Received ride request:", rideData);

            setAcceptedCaptain(rideData);
            setRideInfoShow(true);
        };

        // Listen for ride-requests
        const cleanup = recieveMessage("ride-confirmed", handleRideRequest);

        // Return cleanup function when unmounting
        return cleanup;
    }, [recieveMessage]); // Empty array ensures it runs only once when the component mounts  

    return (
        <div className="flex flex-col gap-4">

            {rideInfoShow && <RideInfo acceptedCaptain={acceptedCaptain} pickup={pickup} destination={destination} />}

            {!rideInfoShow &&
                <>
                    {lookingForDriver && (
                        <>
                            <div className="flex justify-center items-center">
                                <h3 className="text-lg font-semibold">Looking For Driver...</h3>
                            </div>
                            <div className="flex justify-center items-center bg-gray-100 mb-3">
                                <motion.div
                                    className="w-full h-1 bg-gray-300 overflow-hidden relative"
                                    initial={{ width: "0%" }}
                                    animate={{
                                        width: "100%",
                                        backgroundColor: "#D1D5DB", // Tailwind gray-300
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 2, // Adjust duration to make the animation faster/slower
                                        ease: "linear",
                                    }}
                                >
                                </motion.div>
                            </div>
                        </>
                    )}

                    <div
                        className="flex justify-center items-center h-6 w-6 m-5 border-2 bg-slate-400 border-black rounded-full cursor-pointer hover:bg-slate-600"
                        onClick={() => { setConfirmRidePanelShow(false) }}
                    >
                        <i className="ri-arrow-left-line"></i>
                    </div>

                    <div className="flex justify-center mb-4 border-b-2 p-2 border-b-gray-300 w-full">
                        <img
                            src={img}
                            alt={vehicle}
                            className="h-[70px]"
                        />
                    </div>

                    <div>
                        <div className="flex w-full justify-start gap-5">
                            <div className="flex justify-center items-center"> 📍 </div>
                            <div className="space-y-1 border-b-2 p-2 border-b-gray-300 w-full">
                                <h3 className="font-bold">{pickup}</h3>
                                <p className="text-gray-500">Pickup Location</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex w-full justify-start gap-5">
                            <div className="flex justify-center items-center text-lg font-bold"> ∎ </div>
                            <div className="space-y-1 border-b-2 p-2 border-b-gray-300 w-full">
                                <h3 className="font-bold">{destination}</h3>
                                <p className="text-gray-500">Destination</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex w-full justify-start gap-5">
                            <div className="flex justify-center items-center"> 〓 </div>
                            <div className="space-y-1 border-b-2 p-2 border-b-gray-300 w-full">
                                <h3 className="font-bold">{fare}</h3>
                                <p className="text-gray-500">Fare</p>
                            </div>
                        </div>
                    </div>

                    {!lookingForDriver && <div className="flex justify-center items-center mt-1">
                        <button
                            className="p-2 bg-blue-600 font-semibold rounded-lg text-white hover:bg-blue-900 w-1/2"
                            onClick={confirmRideHandler}
                        >
                            Confirm Ride
                        </button>
                    </div>}
                </>
            }
        </div>
    );
};

export default ConfirmRidePanel;