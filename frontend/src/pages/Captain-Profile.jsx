import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CaptainNavbar from '../captain-components/Captain_Navbar';
import Footer from '../components/Footer';

const CaptainProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pastRides, setPastRides] = useState([]);
    const [vehicleDetails, setVehicleDetails] = useState(null);

    useEffect(() => {
        // Fetch captain profile data
        axios.get(`${import.meta.env.VITE_API_URL}/captains/profile`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.user);
            })
            .catch(err => {
                console.error('Profile fetch error:', err);
                setError('Failed to load profile data.');
                setLoading(false);
            });

        // Fetch past rides data
        axios.get(`${import.meta.env.VITE_API_URL}/captains/past-rides`, { withCredentials: true })
            .then(response => {
                setPastRides(response.data);
            })
            .catch(err => {
                console.error('Past rides fetch error:', err);
                setLoading(false);
            });

        axios.get(`${import.meta.env.VITE_API_URL}/captains/vehicle-info`, { withCredentials: true })
            .then(response => {
                setVehicleDetails(response.data);
            })
            .catch(err => {
                console.error('Vehicle info fetch error:', err);
                setLoading(false);
            });

        setLoading(false);
    }, []);

    // Vehicle icon based on vehicle type
    const getVehicleIcon = (vehicleType) => {
        switch (vehicleType) {
            case 'car':
                return "🚗";
            case 'motorcycle':
                return "🏍️";
            case 'auto':
                return "🛺";
            default:
                return "🚘";
        }
    };

    console.log(vehicleDetails);
    

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <CaptainNavbar currentPath="/profile" />

            <div className="flex-grow container mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64 min-h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative min-h-screen" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                ) : profile && vehicleDetails && pastRides && (
                    <div className="max-w-4xl mx-auto min-h-screen">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            {/* Profile Header */}
                            <div className="bg-[#dfa674] text-white px-6 py-4">
                                <h1 className="text-3xl font-bold">Captain Profile</h1>
                            </div>

                            {/* Main Profile Content */}
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row">
                                    {/* Avatar Section */}
                                    <div className="flex-shrink-0 flex flex-col items-center mb-6 md:mb-0 md:mr-10">
                                        <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                                            {profile.firstname ? profile.firstname[0].toUpperCase() : "C"}
                                        </div>
                                        <p className="mt-4 text-xl font-semibold text-center">{profile.firstname} {profile.lastname}</p>
                                        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                            Active Captain
                                        </div>
                                    </div>

                                    {/* Profile Details Section */}
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-600">Email</p>
                                                <p className="font-medium">{profile.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">ID</p>
                                                <p className="font-medium">{profile.id}</p>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-semibold mt-6 mb-4 border-b pb-2">Vehicle Information</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-600">Vehicle Type</p>
                                                <p className="font-medium flex items-center">
                                                    <span className="mr-2">{getVehicleIcon(profile.vehicleType)}</span>
                                                    {vehicleDetails?.vehicle_type ? vehicleDetails?.vehicle_type.charAt(0).toUpperCase() + vehicleDetails?.vehicle_type.slice(1) : 'N/A'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Color</p>
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-5 h-5 rounded-full mr-2"
                                                        style={{ backgroundColor: vehicleDetails.color || 'gray' }}
                                                    />
                                                    <p className="font-medium">{vehicleDetails.color || 'N/A'}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Plate Number</p>
                                                <p className="font-medium">{vehicleDetails.plate || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Capacity</p>
                                                <p className="font-medium">{vehicleDetails.capacity || 'N/A'} passengers</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Past Rides Section */}
                                <div className="mt-8">
                                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Recent Rides</h2>

                                    {pastRides && pastRides.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {pastRides.map((ride, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap">{new Date(ride.createdAt).toLocaleDateString()}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{ride.pickup}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{ride.destination}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">${ride.fare}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">No past rides available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CaptainProfile;
