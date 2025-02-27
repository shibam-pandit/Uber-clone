import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext.jsx";

function RideInfo(props) {

    const { acceptedCaptain, pickup, destination } = props;

    if(!acceptedCaptain) {
        console.log("No accepted captain data received.");
    }
    console.log(acceptedCaptain);
    

    const { captain, vehicle, distance, otp, rideId } = acceptedCaptain;

    const navigate = useNavigate();
    const { recieveMessage } = useContext(SocketContext);

    useEffect(() => {
        const handleRideRequest = async (data) => {
            navigate(`/riding/${rideId}`);
        };

        // Listen for ride-requests
        const cleanup = recieveMessage("otp-verified", handleRideRequest);

        // Return cleanup function when unmounting
        return cleanup;
    }, []); // Empty array ensures it runs only once when the component mounts


    return (
        <div>
            <div className="flex justify-between mb-5">
                <img src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="random person" className="h-[70px] w-[70px] rounded-full" />
                <div className="flex-col justify-items-end">
                    <h4 className="text-base font-semibold text-gray-800">{captain.firstname||""} {captain.lastname||""}</h4>
                    <h1 className="text-2xl font-bold">{vehicle.plate}</h1>
                    <h5 className="text-gray-600">{vehicle.color} Suzuki S-presso LXI</h5>
                    <h4 className="font-semibold text-gray-700">⭐ 4.9</h4>
                    <h4>{distance||"-1"} km away when accepted the ride</h4>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg p-3 mb-4 bg-gray-800 text-yellow-300 inline-block rounded-2xl">OTP: {otp}</h3>
            </div>

            <form className="relative my-5 inline bg-gray-300">
                <input placeholder="Send a message..." className="rounded-2xl px-5 py-3 pr-12 font-semibold" />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 transform">➤</button>
            </form>

            <div className="flex justify-around items-center mt-10 border-b-2 border-gray-300 pb-3">
                <div className="text-center space-y-2 cursor-pointer hover:scale-105">
                    <div className="flex justify-center items-center h-[50px] w-[50px] bg-gray-300 rounded-full mx-auto">🛡️</div>
                    <p>Safety</p>
                </div>
                <div className="text-center space-y-2 cursor-pointer hover:scale-105">
                    <div className="flex justify-center items-center h-[50px] w-[50px] bg-gray-300 rounded-full mx-auto">🌍</div>
                    <p>Share my trip</p>
                </div>
                <div className="text-center space-y-2 cursor-pointer hover:scale-105">
                    <div className="flex justify-center items-center h-[50px] w-[50px] bg-gray-300 rounded-full mx-auto">📞</div>
                    <p>Call driver</p>
                </div>
            </div>

            <div className="flex justify-start gap-3 mt-3">
                <div className="flex justify-center items-center w-1/12">📍</div>
                <div className="border-b-2 border-gray-300 w-full py-2">
                    <h3 className="font-bold text-lg">{pickup}</h3>
                    {/* <p className="text-gray-600 pb-2">Kaikondrahali, Bengaluru, Karnataka</p> */}
                </div>
            </div>
        </div>
    );
}

export default RideInfo;