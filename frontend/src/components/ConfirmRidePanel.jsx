import React, { useState } from "react";
import { motion } from "framer-motion";
import RideInfo from "./RideInfo";

function ConfirmRidePanel() {

    // const { setPricingShow } = props;

    const [lookingForDriver, setLookingForDriver] = useState(false);
    const [rideInfoShow, setRideInfoShow] = useState(false);

    return (
        <div className="flex flex-col gap-4">

            {rideInfoShow && <RideInfo />}

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

                    <div className="flex justify-center mb-4 border-b-2 p-2 border-b-gray-300 w-full">
                        <img
                            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_384,w_576/v1649230978/assets/a2/553a18-2f77-4722-a4ba-f736f4cb405e/original/Uber_Moto_Orange_558x372_pixels_Desktop.png"
                            alt="uber_moto"
                            className="h-[70px]"
                        />
                    </div>

                    <div>
                        <div className="flex w-full justify-start gap-5">
                            <div className="flex justify-center items-center"> 📍 </div>
                            <div className="space-y-1 border-b-2 p-2 border-b-gray-300 w-full">
                                <h3 className="font-bold">562/11-A</h3>
                                <p className="text-gray-500">Kalikondrahalli, Bengaluru, Karnataka</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex w-full justify-start gap-5">
                            <div className="flex justify-center items-center text-lg font-bold"> ∎ </div>
                            <div className="space-y-1 border-b-2 p-2 border-b-gray-300 w-full">
                                <h3 className="font-bold">Third Wave Coffee</h3>
                                <p className="text-gray-500">17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnataka</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex w-full justify-start gap-5">
                            <div className="flex justify-center items-center"> 〓 </div>
                            <div className="space-y-1 border-b-2 p-2 border-b-gray-300 w-full">
                                <h3 className="font-bold">193.20</h3>
                                <p className="text-gray-500">Cash Cash</p>
                            </div>
                        </div>
                    </div>

                    {!lookingForDriver && <div className="flex justify-center items-center mt-1">
                        <button
                            className="p-2 bg-blue-600 font-semibold rounded-lg text-white hover:bg-blue-900 w-1/2"
                            onClick={() => {setLookingForDriver(true); setTimeout(() => {
                                setRideInfoShow(true);
                            }, 5000);}}
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