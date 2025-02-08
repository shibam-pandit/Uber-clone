import React, { useState, useEffect } from "react";
import uber_car from "../assets/uber_car.png";
import uber_moto from "../assets/uber_moto.png";
import uber_auto from "../assets/uber_auto.png";
import axios from "axios";
import ConfirmRidePanel from "./ConfirmRidePanel";

function RidePricing(props) {
    const { pickup, destination, setPricingShow } = props;

    const [loading, setLoading] = useState(false);
    const [fares, setFares] = useState(null);
    const [confirmRidePanelShow, setConfirmRidePanelShow] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState({ vehicle: "", fare: "", img: "" });

    useEffect(() => {
        const fetchFare = async () => {
            if (pickup.length >= 3 && destination.length >= 3) {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_API_URL}/rides/get-fares`,
                        {
                            params: {
                                pickup: pickup,
                                destination: destination,
                            },
                            withCredentials: true,
                        }
                    );

                    if (response.status === 200) {
                        setFares(response.data);
                    } else {
                        setFares(null);
                    }
                } catch (error) {
                    setFares(null);
                    console.error("Error fetching fare:", error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchFare();
    }, [pickup, destination]);

    const clickHandler = (vehicle, fare, img) => {
        setConfirmRidePanelShow(true);
        setSelectedVehicle({ vehicle, fare, img });
    };

    return (
        <div>
            {!confirmRidePanelShow && <div
                className="flex justify-center items-center h-6 w-6 mb-5 border-2 bg-slate-400 border-black rounded-full cursor-pointer hover:bg-slate-600"
                onClick={() => setPricingShow(false)}
            >
                <i className="ri-arrow-left-line"></i>
            </div>}
            {loading && <h2 className="text-sm mt-3 text-gray-800">Calculating prices...</h2>}
            {!loading && fares && !confirmRidePanelShow && (
                <>
                    <h2 className="text-2xl font-semibold mb-5">Choose a vehicle</h2>

                    <div
                        className="align flex w-full items-center justify-between gap-2 px-3 py-4 mb-2 border-2 border-gray-500 hover:bg-gray-200 active:border-black cursor-pointer"
                        onClick={() => clickHandler("car", fares.car, uber_car)}
                    >
                        <img src={uber_car} alt="uber-car" className="h-[75px]" />
                        <div className="w-1/2 space-y-1 text-center">
                            <h4 className="text-lg font-semibold">
                                UberGo <span><i className="ri-map-pin-user-fill"></i></span>4
                            </h4>
                            <h5 className="text-sm font-medium">2 mins away</h5>
                            <p className="text-xs text-gray-500">Affordable compact rides</p>
                        </div>
                        <h2 className="text-lg font-bold">₹{fares.car || "N/A"}</h2>
                    </div>

                    {/* Additional Vehicle Options */}
                    <div
                        className="align flex w-full items-center justify-between gap-2 px-3 py-4 mb-2 border-2 border-gray-500 hover:bg-gray-200 active:border-black cursor-pointer"
                        onClick={() => clickHandler("motorcycle", fares.motorcycle, uber_moto)}
                    >
                        <img
                            src={uber_moto}
                            alt="uber-moto"
                            className="h-12"
                        />
                        <div className="w-1/2 space-y-1 text-center mx-auto">
                            <h4 className="text-lg font-semibold">
                                UberGo <span><i className="ri-map-pin-user-fill"></i></span>1
                            </h4>
                            <h5 className="text-sm font-medium">2 mins away</h5>
                            <p className="text-xs text-gray-500">Affordable compact rides</p>
                        </div>
                        <h2 className="text-lg font-bold">₹{fares.motorcycle || "N/A"}</h2>
                    </div>
                    <div
                        className="align flex w-full items-center justify-between gap-2 px-3 py-4 mb-2 border-2 border-gray-500 hover:bg-gray-200 active:border-black cursor-pointer"
                        onClick={() => clickHandler("auto", fares.auto, uber_auto)}
                    >
                        <img
                            src={uber_auto}
                            alt="uber-auto"
                            className="h-12"
                        />
                        <div className="w-1/2 space-y-1 text-center mx-auto">
                            <h4 className="text-lg font-semibold">UberGo <span><i className="ri-map-pin-user-fill"></i></span>3</h4>
                            <h5 className="text-sm font-medium">2 mins away</h5>
                            <p className="text-xs text-gray-500">Affordable compact rides</p>
                        </div>
                        <h2 className="text-lg font-bold">₹{fares.auto || "N/A"}</h2>
                    </div>
                </>
            )}
            {!loading && !fares && (
                <h2 className="text-sm mt-3 text-gray-800">No fares available. Please try with different addresses.</h2>
            )}
            {confirmRidePanelShow && (
                <div>
                    <div className="inset-0 py-5">
                        <ConfirmRidePanel
                            setConfirmRidePanelShow={setConfirmRidePanelShow}
                            img={selectedVehicle.img}
                            pickup={pickup}
                            destination={destination}
                            fare={selectedVehicle.fare}
                            vehicle={selectedVehicle.vehicle}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default RidePricing;
