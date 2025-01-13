import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // for smooth animations
import { UserDataContext } from '../context/UserContext';
import map from '../assets/map.jpeg';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import LocationSearchPanel from '../components/LocationSearchPanel';
import RidePricing from '../components/RidePricing';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import 'remixicon/fonts/remixicon.css';

const Home = () => {
    const [isFormExpanded, setFormExpanded] = useState(false); // Form visibility in small screens
    const [pickup, setPickup] = useState(''); // Pickup location input
    const [drop, setDrop] = useState(''); // Drop location input
    const [searchPanelShow, setSearchPanelShow] = useState(false); // Search panel visibility
    const [pricingShow, setPricingShow] = useState(false); // Pricing visibility
    const [activeInput, setActiveInput] = useState(null); // Currently active input
    const [confirmRidePanelShow, setConfirmRidePanelShow] = useState(false); // Confirm ride panel visibility

    const pickupHandler = (e) => setPickup(e.target.value);
    const dropHandler = (e) => setDrop(e.target.value);
    const handleInputClick = () => setFormExpanded(true);
    const handleCloseForm = () => setFormExpanded(false);

    const inputClickHandler = (elem) => {
        setSearchPanelShow(true);
        setActiveInput(elem);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (pickup && drop) {
            setSearchPanelShow(false);
            setPricingShow(true);
            setConfirmRidePanelShow(false);
        }
    };

    const { user } = React.useContext(UserDataContext);

    return (
        <div>
            <Navbar />
            <div className="relative min-h-screen bg-[#f2e9db]">
                {/* Large Screen Layout */}
                <div className="hidden lg:flex min-h-screen">
                    <div className="w-1/3 p-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Hey {user?.firstname || ''}, Book a Ride
                        </h2>
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="line absolute top-[17%] bg-gray-800 h-16 w-1 ml-2"></div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Pickup Location"
                                    className="text-sm w-full px-6 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    value={pickup}
                                    onChange={pickupHandler}
                                    onClick={() => inputClickHandler('pickup')}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Drop Location"
                                    className="text-sm w-full px-6 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                    value={drop}
                                    onChange={dropHandler}
                                    onClick={() => inputClickHandler('drop')}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-900 transition"
                            >
                                Show Prices
                            </button>
                        </form>
                        {searchPanelShow && (
                            <LocationSearchPanel
                                setPickup={setPickup}
                                setDrop={setDrop}
                                activeInput={activeInput}
                            />
                        )}
                    </div>
                    <div className="w-2/3 ml-5 border-l-2 border-l-black">
                        <img
                            src={map}
                            alt="Map"
                            className={`object-cover min-h-full w-full ${pricingShow || confirmRidePanelShow ? 'hidden' : 'block'}`}
                        />
                        {pricingShow && !confirmRidePanelShow && (
                            <div className="inset-0 p-[20%] pt-5">
                                <RidePricing
                                    setPricingShow={setPricingShow}
                                    setConfirmRidePanelShow={setConfirmRidePanelShow}
                                />
                            </div>
                        )}
                        {confirmRidePanelShow && !pricingShow && (
                            <div>
                                <div
                                    className="flex justify-center items-center h-6 w-6 m-5 border-2 bg-slate-400 border-black rounded-full cursor-pointer hover:bg-slate-600"
                                    onClick={() => { setPricingShow(true); setConfirmRidePanelShow(false) }}
                                >
                                    <i className="ri-arrow-left-line"></i>
                                </div>
                                <div className="inset-0 py-5 px-[20%]">
                                    <ConfirmRidePanel />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Small Screen Layout */}
                <div className="lg:hidden relative">
                    <img
                        src={map}
                        alt="Map"
                        className={`object-cover h-screen w-full ${isFormExpanded ? 'blur-md' : ''}`}
                    />
                    {!isFormExpanded && (
                        <motion.div
                            className="absolute bottom-0 w-full bg-gray-900 bg-opacity-80 text-white p-4"
                            initial={{ y: '-500%' }}
                            animate={{ y: 0 }}
                            transition={{ type: 'spring', stiffness: 50 }}
                        >
                            <form
                                onClick={handleInputClick}
                                className="space-y-4 text-center cursor-pointer mb-12"
                            >
                                <p className="font-semibold text-2xl">Book Your Ride</p>
                                <div className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium w-full">
                                    <span className="text-white">Click to enter details</span>
                                </div>
                            </form>
                        </motion.div>
                    )}
                    {isFormExpanded && (
                        <motion.div
                            className="absolute inset-0 bg-[#f2e9db] p-8"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', stiffness: 50 }}
                        >
                            <button
                                onClick={handleCloseForm}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                            >
                                &times;
                            </button>
                            <h2 className={`text-2xl font-bold text-center mb-6 ${pricingShow || confirmRidePanelShow ? 'hidden' : 'block'}`}>Book a Ride</h2>
                            <form className={`space-y-4 ${pricingShow || confirmRidePanelShow ? 'hidden' : 'block'}`} onSubmit={submitHandler}>
                                <div>
                                    <label className="block mb-2 text-gray-700 font-semibold">Pickup Location</label>
                                    <input
                                        type="text"
                                        placeholder="Enter pickup location"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        value={pickup}
                                        onChange={pickupHandler}
                                        onClick={() => inputClickHandler('pickup')}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-gray-700 font-semibold">Drop Location</label>
                                    <input
                                        type="text"
                                        placeholder="Enter drop location"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                        value={drop}
                                        onChange={dropHandler}
                                        onClick={() => inputClickHandler('drop')}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-900 transition"
                                >
                                    Show Prices
                                </button>
                            </form>
                            {searchPanelShow && !pricingShow && !confirmRidePanelShow && (
                                <LocationSearchPanel
                                    setPickup={setPickup}
                                    setDrop={setDrop}
                                    activeInput={activeInput}
                                />
                            )}

                            {pricingShow && (
                                <div>
                                    <div
                                        className="flex justify-center items-center h-6 w-6 mb-5 border-2 bg-slate-400 border-black rounded-full cursor-pointer hover:bg-slate-600"
                                        onClick={() => setPricingShow(false)}
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                    </div>
                                    <RidePricing
                                        setPricingShow={setPricingShow}
                                        setConfirmRidePanelShow={setConfirmRidePanelShow}
                                    />
                                </div>
                            )}

                            {confirmRidePanelShow && !pricingShow && (
                                <div>
                                    <div
                                        className="flex justify-center items-center h-6 w-6 mb-9 border-2 bg-slate-400 border-black rounded-full cursor-pointer hover:bg-slate-600"
                                        onClick={() => { setPricingShow(true); setConfirmRidePanelShow(false) }}
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                    </div>
                                    <div >
                                        <ConfirmRidePanel />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;