import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ConfirmRide(props) {
    const { setConfirmRidePanelShow, request } = props;

    // Split the pickup address into two parts
    const pickupParts = request.pickup.split(" ", 2); // Adjust the split logic based on actual input format
    const pickupNumbers = pickupParts[0]; // Number part (e.g., "123/3/4")
    const pickupRoad = pickupParts[1]; // Road name part
    // Split the drop address into two parts
    const dropParts = request.drop.split(" ", 2); // Adjust the split logic based on actual input format
    const dropNumbers = dropParts[0]; // Number part (e.g., "123/3/4")
    const dropRoad = dropParts[1]; // Road name part

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
                            <h3 className="font-bold">{pickupNumbers}</h3>
                            <p className="text-gray-300 font-mono">{pickupRoad}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center gap-5">
                        <div className="text-2xl">∎</div>
                        <div className="space-y-1">
                            <h3 className="font-bold">{dropNumbers}</h3>
                            <p className="text-gray-300 font-mono">{dropRoad}</p>
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
                    <Link
                        to="/captain-riding"
                        className="bg-green-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition mb-4 w-full"
                    >
                        Go to Pickup
                    </Link>
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
