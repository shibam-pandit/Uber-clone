import React from "react";

function Riding() {
  // Dummy values for ride details
  const rideDetails = {
    vehicle: "Sedan - Toyota Camry",
    driver: "John Doe",
    pickupLocation: "123 Main Street, Cityville",
    dropLocation: "456 Elm Street, Townsville",
    fare: 25.75,
    estimatedTime: 15,
    driverContact: "+1 234 567 890",
    rideStatus: "Ongoing",
  };

  const {
    vehicle,
    driver,
    pickupLocation,
    dropLocation,
    fare,
    estimatedTime,
    driverContact,
    rideStatus,
  } = rideDetails;

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Ride Details</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ride Information</h2>
          <p className="text-gray-700"><strong>Vehicle:</strong> {vehicle}</p>
          <p className="text-gray-700"><strong>Driver:</strong> {driver}</p>
          <p className="text-gray-700"><strong>Pickup Location:</strong> {pickupLocation}</p>
          <p className="text-gray-700"><strong>Drop Location:</strong> {dropLocation}</p>
          <p className="text-gray-700"><strong>Fare:</strong> ${fare.toFixed(2)}</p>
          <p className="text-gray-700"><strong>Estimated Time:</strong> {estimatedTime} mins</p>
          <p className="text-gray-700"><strong>Ride Status:</strong> {rideStatus}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Your Driver</h2>
          <p className="text-gray-700"><strong>Phone:</strong> {driverContact}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => alert('Calling the driver...')}
          >
            Call Driver
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Route Map</h2>
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center border border-gray-300 rounded">
            Map Preview Here
          </div>
        </div>

        <div className="text-center">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition"
            onClick={() => alert('Proceeding to payment...')}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Riding;
