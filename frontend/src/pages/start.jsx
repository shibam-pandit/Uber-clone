import React from "react";
import { Link } from "react-router-dom";

function Start() {
    return (
        <div className="bg-gray-100 font-sans">
            {/* Logo Section */}
            <header className="fixed top-0 z-30 w-full bg-[#dfa674] shadow-lg">
                <div className="container mx-auto flex items-center justify-between px-6 md:px-12 max-h-14">
                    <img
                        src="https://www.svgrepo.com/show/303453/uber-12-logo.svg"
                        alt="Uber Logo"
                        className="h-16 md:h-20 object-cover"
                    />
                    <nav>
                    <Link 
                    to="/login"
                    className="m-1 p-3 bg-[#002D74] text-white rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium">
                        User Login
                    </Link>
                    <Link 
                    to="/captain-login"
                    className="m-1 p-3 bg-[#002D74] text-white rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium">
                        Driver Login
                    </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative mt-0 h-screen bg-gray-900 text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Cityscape"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 z-10 bg-black bg-opacity-50"></div>
                <div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
                    <h1 className="mb-4 text-5xl font-bold md:text-7xl">Your Ride, On Demand</h1>
                    <p className="mb-8 text-xl md:text-2xl">Seamless. Fast. Affordable.</p>
                    <Link
                        to="/login"
                        className="rounded-lg bg-blue-500 px-6 py-3 text-lg text-white shadow-lg hover:bg-blue-600"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <section className="bg-white py-16" >
                <div className="container mx-auto px-6 md:px-12">   
                    <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Us?</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg bg-gray-50 p-6 text-center shadow-lg">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/854/854878.png"
                                alt="GPS Icon"
                                className="mx-auto mb-4 h-12"
                            />
                            <h3 className="mb-4 text-2xl font-semibold">Real-Time Tracking</h3>
                            <p>Track your ride in real-time with precise GPS technology.</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-6 text-center shadow-lg">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/17420/17420758.png"
                                alt="Car Icon"
                                className="mx-auto mb-4 h-12"
                            />
                            <h3 className="mb-4 text-2xl font-semibold">Reliable Rides</h3>
                            <p>Our drivers are always ready to take you where you need to go.</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-6 text-center shadow-lg">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/9084/9084553.png"
                                alt="Affordable Icon"
                                className="mx-auto mb-4 h-12"
                            />
                            <h3 className="mb-4 text-2xl font-semibold">Affordable Pricing</h3>
                            <p>Enjoy competitive pricing without compromising on quality.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-blue-500 py-16 text-white">
                <div className="container mx-auto px-6 text-center md:px-12">
                    <h2 className="mb-6 text-4xl font-bold">Ready to Ride?</h2>
                    <p className="mb-8 text-lg">Sign up now and book your first ride today!</p>
                    <Link
                        to="/register"
                        className="rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-500 hover:bg-gray-200"
                    >
                        Sign Up
                    </Link>
                </div>
            </section>

            {/* Become a Driver Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-6 text-center md:px-12">
                    <h2 className="mb-6 text-4xl font-bold">Become a Driver</h2>
                    <p className="mb-8 text-lg">Join our team and start earning by driving with us.</p>
                    <Link
                        to="/captains/register"
                        className="rounded-lg bg-blue-500 px-6 py-3 text-lg text-white shadow-lg hover:bg-blue-600"
                    >
                        Get Started As A Driver
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-8 text-gray-400">
                <div className="container mx-auto px-6 text-center md:px-12">
                    <p>&copy; {new Date().getFullYear()} Uber Clone. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Start;
