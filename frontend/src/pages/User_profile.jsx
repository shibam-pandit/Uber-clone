import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCarSide, FaMapMarkerAlt, FaStar, FaClock, FaWallet, FaHistory, FaExclamationTriangle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User_profile = () => {
    const [userData, setUserData] = useState(null);
    const [pastRides, setPastRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    function handleLogout() {
        axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
            withCredentials: true
        }).then(() => {
            navigate('/');
        }).catch(error => {
            console.error('Logout error:', error);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Try to fetch both data sources concurrently for better performance
                const [userResponse, ridesResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
                        withCredentials: true
                    }),
                    axios.get(`${import.meta.env.VITE_API_URL}/users/past-rides`, {
                        withCredentials: true
                    })
                ]);
                
                setUserData(userResponse.data.user);
                setPastRides(ridesResponse.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load user data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />
                <div className="flex-grow flex items-center justify-center min-h-screen">
                    <div className="text-center p-8">
                        <div className="inline-block w-16 h-16 border-4 border-t-[#dfa674] border-opacity-50 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600 font-medium">Loading user profile...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />
                <div className="flex-grow flex items-center justify-center min-h-screen">
                    <div className="text-center p-8 max-w-md">
                        <FaExclamationTriangle className="mx-auto text-[#dfa674] w-16 h-16" />
                        <h2 className="mt-4 text-xl font-bold text-gray-800">Something went wrong</h2>
                        <p className="mt-2 text-gray-600">{error || "Couldn't load user profile data. Please try again later."}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 px-5 py-2 bg-[#dfa674] text-white rounded-lg hover:bg-[#d19562] transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar currentPath="/profile"/>

            <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl shadow-lg p-6 md:p-8 text-white mb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start">
                            <div className="mb-4 md:mb-0 md:mr-8">
                                {userData?.profileImage ? (
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-28 h-28 rounded-full border-4 border-white object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="w-28 h-28 text-white" />
                                )}
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-bold mb-2">{userData?.firstname || 'User'} {userData?.lastname || 'User'}</h1>
                                <p className="mb-1"><span className="font-semibold">Email:</span> {userData?.email || 'Not available'}</p>
                                <p className="mb-1"><span className="font-semibold">Phone:</span> {userData?.phone || 'Not available'}</p>
                                <p className="mb-1"><span className="font-semibold">Member since:</span> {userData?.memberSince || 'Not available'}</p>
                                <button onClick={handleLogout} className='bg-red-600 text-white font-semibold px-4 py-2 rounded-lg mt-4 hover:bg-red-800 transition-colors'>Logout</button>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">Your Statistics</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                                <FaCarSide className="w-6 h-6 text-[#dfa674] mb-4" />
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{pastRides?.length || '0'}</h3>
                                <p className="text-gray-600 text-sm">Total Rides</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                                <FaMapMarkerAlt className="w-6 h-6 text-[#dfa674] mb-4" />
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{userData?.stats?.totalDistance || '0 km'}</h3>
                                <p className="text-gray-600 text-sm">Distance Traveled</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                                <FaStar className="w-6 h-6 text-[#dfa674] mb-4" />
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{userData?.stats?.averageRating || 'N/A'}</h3>
                                <p className="text-gray-600 text-sm">Average Rating</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                                <FaMapMarkerAlt className="w-6 h-6 text-[#dfa674] mb-4" />
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{userData?.stats?.favoriteDestination || 'N/A'}</h3>
                                <p className="text-gray-600 text-sm">Favorite Destination</p>
                            </div>
                        </div>
                    </div>

                    {/* Past Rides */}
                    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <FaHistory className="mr-3 text-[#dfa674]" />
                            Your Past Rides
                        </h2>

                        {pastRides.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {pastRides.map(ride => (
                                    <div key={ride.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between mb-4">
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <FaClock className="mr-2" />
                                                {ride.date || 'Unknown date'}
                                            </div>
                                            <div className="flex items-center font-bold text-[#dfa674] text-sm">
                                                <FaWallet className="mr-2" />
                                                {ride.fare || '$0.00'}
                                            </div>
                                        </div>

                                        <div className="relative my-6 pl-6 border-l-2 border-gray-200">
                                            <div className="mb-5">
                                                <div className="absolute -left-1.5 top-0">
                                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                </div>
                                                <p className="font-medium">{ride.pickup || 'Starting point'}</p>
                                            </div>
                                            <div>
                                                <div className="absolute -left-1.5 bottom-0">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                </div>
                                                <p className="font-medium">{ride.destination || 'Destination'}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4 text-sm">
                                            <div className="text-gray-600">
                                                Driver ID: {ride.captainid || 'Unknown'}
                                            </div>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={`w-4 h-4 ${i < (ride.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} mr-0.5`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                                <FaCarSide className="mx-auto text-gray-300 w-12 h-12 mb-3" />
                                <h3 className="text-xl font-medium text-gray-700 mb-1">No rides yet</h3>
                                <p className="text-gray-500">You haven't taken any rides with us yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default User_profile;
