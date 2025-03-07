import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CaptainNavbar from '../captain-components/Captain_Navbar';
import Footer from '../components/Footer';
import shibam from '../assets/Shibam.jpg';

function About() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('mission');
  const requestFrom = searchParams.get('requestFrom');
  
  useEffect(() => {
    // Get section from URL params or default to 'mission'
    const section = searchParams.get('section') || 'mission';
    setActiveSection(section);
    
    // Scroll to the section if specified
    if (section && document.getElementById(section)) {
      const element = document.getElementById(section);
      const yOffset = -80; // Header height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [searchParams]);

  // Function to update URL and active section
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSearchParams({ section });
  };

  // Framer motion animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {requestFrom === "home" && <Navbar currentPath="/about" />}
      {requestFrom === "captain-home" && <CaptainNavbar currentPath="/about" />}
      
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-r from-blue-900 to-black text-white py-24 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">About Our Service</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Revolutionizing urban transportation with technology and exceptional service.
            </p>
          </div>
        </div>
      </motion.section>
      
      {/* Navigation Tabs */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-8 py-4">
            <button 
              onClick={() => handleSectionChange('mission')}
              className={`px-3 py-2 font-medium text-sm rounded-md whitespace-nowrap ${
                activeSection === 'mission' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Our Mission
            </button>
            <button 
              onClick={() => handleSectionChange('how-it-works')}
              className={`px-3 py-2 font-medium text-sm rounded-md whitespace-nowrap ${
                activeSection === 'how-it-works' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              How It Works
            </button>
            <button 
              onClick={() => handleSectionChange('team')}
              className={`px-3 py-2 font-medium text-sm rounded-md whitespace-nowrap ${
                activeSection === 'team' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Created by
            </button>
            <button 
              onClick={() => handleSectionChange('benefits')}
              className={`px-3 py-2 font-medium text-sm rounded-md whitespace-nowrap ${
                activeSection === 'benefits' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Benefits
            </button>
          </div>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <motion.section 
          id="mission"
          className={`mb-16 ${activeSection !== 'mission' && 'opacity-80'}`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Our mission is to improve people's lives with the world's best transportation. We're committed to making urban mobility more efficient, affordable, and sustainable.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We believe in a world where transportation is a service that's accessible to everyone, everywhere. We work tirelessly to remove barriers and create connections between people, places, and possibilities.
              </p>
              <p className="text-lg text-gray-700">
                By making transportation as reliable as running water, we hope to improve the quality of life for everyone in the communities we serve.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800" 
                alt="Urban transportation" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>
        
        {/* How It Works Section */}
        <motion.section 
          id="how-it-works"
          className={`mb-16 ${activeSection !== 'how-it-works' && 'opacity-80'}`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Request a Ride</h3>
              <p className="text-gray-600">
                Open the app and enter your destination. You'll see upfront pricing and estimated time of arrival.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Match with a Driver</h3>
              <p className="text-gray-600">
                We'll connect you with a nearby driver who'll arrive at your pickup location in minutes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Track your trip in real-time, share your ETA with friends, and rate your driver after arriving.
              </p>
            </div>
          </div>
        </motion.section>
        
        {/* Team Section */}
        <motion.section 
          id="team"
          className={`mb-16 ${activeSection !== 'team' && 'opacity-80'}`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Created by</h2>
          <p className="text-lg text-gray-700 mb-8">
            This project was created by Shibam Pandit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Shibam Pandit",
                role: "Built this Uber-clone project",
                image: shibam
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
        
        {/* Benefits Section */}
        <motion.section 
          id="benefits"
          className={`mb-16 ${activeSection !== 'benefits' && 'opacity-80'}`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <i className="ri-shield-check-line text-green-500 mr-2 text-2xl"></i>
                  Safety First
                </h3>
                <p className="text-gray-700 pl-8">
                  Driver background checks, real-time trip tracking, and 24/7 support make safety our top priority.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <i className="ri-wallet-3-line text-green-500 mr-2 text-2xl"></i>
                  Affordable Transportation
                </h3>
                <p className="text-gray-700 pl-8">
                  Competitive pricing and transparent upfront fares make transportation accessible to everyone.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <i className="ri-earth-line text-green-500 mr-2 text-2xl"></i>
                  Environmental Impact
                </h3>
                <p className="text-gray-700 pl-8">
                  Shared rides and efficient routing help reduce traffic congestion and carbon emissions.
                </p>
              </div>
            </div>
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <i className="ri-timer-line text-green-500 mr-2 text-2xl"></i>
                  Time Efficiency
                </h3>
                <p className="text-gray-700 pl-8">
                  Quick pickups, optimized routes, and no parking hassles save you valuable time.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <i className="ri-group-line text-green-500 mr-2 text-2xl"></i>
                  Community Support
                </h3>
                <p className="text-gray-700 pl-8">
                  We create flexible earning opportunities for drivers and contribute to local economies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <i className="ri-smartphone-line text-green-500 mr-2 text-2xl"></i>
                  Seamless Technology
                </h3>
                <p className="text-gray-700 pl-8">
                  Our intuitive app makes requesting, tracking, and paying for rides effortless.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      
      <Footer />
    </div>
  );
}

export default About;
