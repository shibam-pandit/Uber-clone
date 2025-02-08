import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function ConfirmRide(props) {
    const { setConfirmRidePanelShow, request } = props;

    // Split the pickup address into first word and the rest
    const [pickupFirstWord, ...pickupRest] = request.pickup.split(" ");
    const pickupAddress = pickupRest.join(" "); // Join the rest of the address back into a string

    // Split the drop address into first word and the rest
    const [dropFirstWord, ...dropRest] = request.drop.split(" ");
    const dropAddress = dropRest.join(" "); // Join the rest of the address back into a string

    const navigate = useNavigate();

    const confirmRideHandler = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/captains/confirm-ride`, {
                userId: request.userId,
                rideId: request.id,
                distance: request.distance
            }, {
                withCredentials: true
            });

            if(response.status === 200) 
                navigate("/captain-riding");
            else if(response.status === 401)
                navigate("/captain-login");
                
        } catch (error) {
            console.error("Error creating ride:", error.message);
            alert("Error creating ride. Please try again.");
        }
    }

    return (
        <div>
            <motion.div
                className="bg-gradient-to-r from-[#052a55] to-[#13123fd7] text-gray-200 rounded-lg shadow-md p-8 mb-12 text-left"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center mb-4">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="user pic"
                        className="h-12 w-12 rounded-full mr-4"
                    />
                    <p className="font-semibold font-serif">{request.userName}</p>
                </div>

                <div className="mb-6">
                    <div className="flex items-center gap-5">
                        <div className="text-2xl">📍</div>
                        <div className="space-y-1">
                            <h3 className="font-bold">{pickupFirstWord}</h3>
                            <p className="text-gray-300 font-mono">{pickupAddress}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center gap-5">
                        <div className="text-2xl">∎</div>
                        <div className="space-y-1">
                            <h3 className="font-bold">{dropFirstWord}</h3>
                            <p className="text-gray-300 font-mono">{dropAddress}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center gap-5">
                        <div className="text-2xl">〓</div>
                        <div className="space-y-1">
                            <h3 className="font-bold">{request.fare}</h3>
                            <p className="text-gray-300 font-mono">Cash Payment</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full justify-around items-center mt-4">
                    <button
                        onClick={confirmRideHandler}
                        className="bg-green-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition mb-4 w-full"
                    >
                        Go to Pickup
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition w-full"
                        onClick={() => setConfirmRidePanelShow(false)}
                    >
                        Cancel
                    </button>
                </div>

            </motion.div>
        </div>
    );
}

export default ConfirmRide;
