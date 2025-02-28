import React, { useContext, useEffect, useState } from 'react';
import ConfirmRidePanel from '../captain-components/ConfirmRide';
import { motion } from 'framer-motion';
import { SocketContext } from '../context/socketContext';

function RideRequest() {
    const [confirmRidePanelShow, setConfirmRidePanelShow] = useState(false);
    const [currentRide, setCurrentRide] = useState(null);

    // Simulate receiving ride requests
    const [Requests, setRequests] = useState([
        {
            id: 101,
            userName: "John Doe",
            pickup: "123 Main St",
            drop: "456 Elm St",
            fare: "15",
            distance: 2
        },
        {
            id: 102,
            userName: "Alice Smith",
            pickup: "789 Oak St",
            drop: "321 Pine St",
            fare: "20",
            distance: 3
        },
    ]);

    const { recieveMessage } = useContext(SocketContext);

    // populate requests based on available rides
    useEffect(() => {
        const handleRideRequest = async (rideData) => {
            console.log("Received ride request:", rideData);

            const { data, distance, user } = rideData;
            const newRide = {
                userId: data.userid,
                id: data.id,
                userName: user.firstname + " " + user.lastname,
                pickup: data.pickup,
                drop: data.destination,
                fare: data.fare,
                distance: distance,
            };

            setRequests((prevRequests) => [newRide, ...prevRequests]);
        };

        // Listen for ride-requests
        const cleanup = recieveMessage("ride-requests", handleRideRequest);

        // Return cleanup function when unmounting
        return cleanup;
    }, [recieveMessage]); // Empty array ensures it runs only once when the component mounts


    const declineHandler = (ride) => {
        setRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== ride.id)
        );
    };

    return (
        <div>
            <h2 className="text-4xl font-bold text-gray-900 pb-8 sm:mb-6 w-full flex justify-center">
                {confirmRidePanelShow ? "Confirm Ride" : "Ride Requests"}
            </h2>

            {!confirmRidePanelShow ? (
                <div>
                    {Requests.length <= 0 && (
                        <div className="text-white text-xl font-semibold bg-blue-900 p-6 text-center rounded-lg">
                            Currently no ride requests are there
                        </div>
                    )}
                    <ul className="space-y-6">
                        {Requests.map((request) => (
                            <li
                                key={request.id}
                                className="bg-blue-900 p-6 rounded-lg shadow-md space-y-5 cursor-pointer"
                            >
                                <motion.div
                                    className="flex flex-col lg:flex-row lg:justify-between lg:items-start sm:items-center sm:text-center w-full"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}>
                                    {/* User Info */}
                                    <div className="flex items-center justify-between md:flex-col md:items-center lg:justify-end lg:order-2 lg:mb-0 mb-4 w-full">
                                        {/* Image & Username - Flex on Small Screens, Stacked on Large Screens */}
                                        <div className="flex items-center md:flex-col md:items-center">
                                            <img
                                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
                                                alt="user pic"
                                                className="h-12 w-12 rounded-full md:mr-0 sm:mr-4 m-2"
                                            />
                                            <p className="ml-4 md:ml-0 md:mt-2">{request.userName}</p>
                                        </div>

                                        {/* Distance - Moves to the Right on Small Screens, Stays Below on Large Screens */}
                                        <p className="sm:ml-auto md:ml-0 md:mt-2 text-xs sm:text-right">
                                            <span className='text-xl font-semibold'>{request.distance}</span> km away
                                        </p>
                                    </div>

                                    {/* Request Details */}
                                    <div className="flex flex-col lg:items-start sm:items-center">
                                        <p className="text-white font-semibold text-lg p-2">
                                            Pickup: <span className="ml-1">{request.pickup}</span>
                                        </p>
                                        <hr className="w-full text-gray-400" />
                                        <p className="text-white font-semibold text-lg p-2">
                                            Drop: <span className="ml-1">{request.drop}</span>
                                        </p>
                                        <hr className="w-full text-gray-400" />
                                        <p className="text-white font-semibold text-lg p-2">
                                            Fare: <span className="ml-1 text-2xl">₹{request.fare}</span>
                                        </p>
                                        <hr className="w-full text-gray-400" />
                                    </div>
                                </motion.div>

                                <div className="flex justify-around items-center mt-4 mx-auto w-full text-center">
                                    <button
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                                        onClick={() => {
                                            setCurrentRide(request);
                                            setConfirmRidePanelShow(true);
                                        }}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                                        onClick={() => declineHandler(request)}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <ConfirmRidePanel
                    setConfirmRidePanelShow={setConfirmRidePanelShow}
                    request={currentRide}
                />
            )}
        </div>
    );
}

export default RideRequest;
