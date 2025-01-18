import React, { useState } from "react";

const OTPInput = ({ correctOTP, onSuccess }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    // Handle OTP input change
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
            setError(""); // Clear error if the input is valid
        }
    };

    // Handle OTP submission
    const handleSubmit = () => {
        if (otp === correctOTP) {
            onSuccess(); // Call the success handler
        } else {
            setError("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-bold">Enter OTP to continue</h2>
            <input
                type="text"
                value={otp}
                onChange={handleChange}
                className="border rounded-md p-2 w-40 text-center text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 6-digit OTP"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                onClick={handleSubmit}
                disabled={otp.length !== 6}
                className={`px-4 py-2 rounded-md text-white font-bold ${
                    otp.length === 6 ? "bg-yellow-600 hover:bg-yellow-800" : "bg-gray-400 cursor-not-allowed"
                }`}
            >
                Verify OTP
            </button>
        </div>
    );
};

export default OTPInput;