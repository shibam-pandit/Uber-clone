import React from "react";

function RideInfo() {
    return (
        <div>
            <div className="flex justify-between mb-5">
                <img src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="random person" className="h-[70px] w-[70px] rounded-full" />
                <div className="flex-col justify-items-end">
                    <h4 className="text-base font-semibold text-gray-800">SANTH</h4>
                    <h1 className="text-2xl font-bold">KA15AK00-0</h1>
                    <h5 className="text-gray-600">White Suzuki S-presso LXI</h5>
                    <h4 className="font-semibold text-gray-700">⭐ 4.9</h4>
                </div>
            </div>

            <form className="relative my-5 inline bg-gray-300">
                <input placeholder="Send a message..." className="rounded-2xl px-5 py-3 pr-12 font-semibold" />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 transform">➤</button>
            </form>

            <div className="flex justify-around items-center mt-10 border-b-2 border-gray-300 pb-3">
                <div className="text-center space-y-2 cursor-pointer hover:scale-105">
                    <div className="flex justify-center items-center h-[50px] w-[50px] bg-gray-300 rounded-full mx-auto">🛡️</div>
                    <p>Safety</p>
                </div>
                <div className="text-center space-y-2 cursor-pointer hover:scale-105">
                    <div className="flex justify-center items-center h-[50px] w-[50px] bg-gray-300 rounded-full mx-auto">🌍</div>
                    <p>Share my trip</p>
                </div>
                <div className="text-center space-y-2 cursor-pointer hover:scale-105">
                    <div className="flex justify-center items-center h-[50px] w-[50px] bg-gray-300 rounded-full mx-auto">📞</div>
                    <p>Call driver</p>
                </div>
            </div>

            <div className="flex justify-start gap-3 mt-3">
                <div className="flex justify-center items-center w-1/12">📍</div>
                <div className="border-b-2 border-gray-300 w-full">
                    <h3 className="font-bold text-lg">562/11-A</h3>
                    <p className="text-gray-600 pb-2">Kaikondrahali, Bengaluru, Karnataka</p>
                </div>
            </div>
        </div>
    );
}

export default RideInfo;