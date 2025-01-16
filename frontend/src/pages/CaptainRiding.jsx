import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function CaptainRiding({ destination, directions }) {
    const [panelOpen, setPanelOpen] = useState(false);

    const togglePanel = () => setPanelOpen(!panelOpen);

    return (
        <div className="relative h-screen w-full">
            {/* Map Section */}
            <MapContainer
                center={[51.505, -0.09]} // Replace with dynamic coordinates
                zoom={13}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
            </MapContainer>

            {/* Bottom/Side Panel */}
            <AnimatePresence>
                <motion.div
                    className={`fixed z-50 bg-gray-900 text-white shadow-lg p-4 ${
                        panelOpen
                            ? "h-[90%] w-full md:w-1/3 bottom-0 md:right-0 md:bottom-auto"
                            : "h-16 w-full md:w-1/3 bottom-0 md:right-0 md:bottom-auto"
                    } md:h-full overflow-y-auto transition-all`}
                    initial={{ y: panelOpen ? "100%" : 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Panel Header */}
                    <div
                        className="flex justify-between items-center mb-2 cursor-pointer"
                        onClick={togglePanel}
                    >
                        <h3 className="text-xl font-bold">{destination}</h3>
                        <motion.div
                            className="text-2xl"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: panelOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {panelOpen ? "\u25BC" : "\u25B2"}
                        </motion.div>
                    </div>

                    {/* Panel Content */}
                    {panelOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Directions */}
                            <div className="mt-4 space-y-3">
                                <h4 className="font-semibold text-lg">Instructions:</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    {directions.map((instruction, index) => (
                                        <li key={index} className="text-gray-300">
                                            {instruction}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Complete Ride Button */}
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
                            >
                                Complete Ride
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default CaptainRiding;
