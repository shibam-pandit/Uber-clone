import { useContext, useEffect, useState } from "react"
import ConfirmRidePanel from "../captain-components/ConfirmRide"
import { motion } from "framer-motion"
import { SocketContext } from "../context/socketContext"

function RideRequest() {
  const [confirmRidePanelShow, setConfirmRidePanelShow] = useState(false)
  const [currentRide, setCurrentRide] = useState(null)

  // Simulate receiving ride requests
  const [Requests, setRequests] = useState([
    {
      id: 101,
      userName: "John Doe",
      pickup: "123 Main St",
      drop: "456 Elm St",
      fare: "15",
      distance: 2,
    },
    {
      id: 102,
      userName: "Alice Smith",
      pickup: "789 Oak St",
      drop: "321 Pine St",
      fare: "20",
      distance: 3,
    },
  ])

  const { recieveMessage } = useContext(SocketContext)

  // populate requests based on available rides
  useEffect(() => {
    const handleRideRequest = async (rideData) => {
      console.log("Received ride request:", rideData)

      const { data, distance, user } = rideData
      const newRide = {
        userId: data.userid,
        id: data.id,
        userName: user.firstname + " " + user.lastname,
        pickup: data.pickup,
        drop: data.destination,
        fare: data.fare,
        distance: distance,
      }

      setRequests((prevRequests) => [newRide, ...prevRequests])
    }

    // Listen for ride-requests
    const cleanup = recieveMessage("ride-requests", handleRideRequest)

    // Return cleanup function when unmounting
    return cleanup
  }, [recieveMessage]) // Empty array ensures it runs only once when the component mounts

  const declineHandler = (ride) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== ride.id))
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 pb-4 sm:pb-6 md:pb-8 text-center">
        {confirmRidePanelShow ? "Confirm Ride" : "Ride Requests"}
      </h2>

      {!confirmRidePanelShow ? (
        <div>
          {Requests.length <= 0 && (
            <div className="text-white text-base sm:text-lg md:text-xl font-semibold bg-blue-900 p-4 sm:p-6 text-center rounded-lg">
              Currently no ride requests are there
            </div>
          )}
          <ul className="space-y-4 sm:space-y-6">
            {Requests.map((request) => (
              <li
                key={request.id}
                className="bg-blue-900 p-4 sm:p-6 rounded-lg shadow-md space-y-3 sm:space-y-5 cursor-pointer"
              >
                <motion.div
                  className="flex flex-col w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* User Info - Always at the top */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="user pic"
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-2 sm:mr-3"
                      />
                      <p className="text-sm sm:text-base md:text-lg">{request.userName}</p>
                    </div>
                    <div className="text-xs sm:text-sm md:text-base">
                      <span className="text-base sm:text-lg md:text-xl font-semibold">{request.distance}</span> km away
                    </div>
                  </div>

                  {/* Request Details - Middle section */}
                  <div className="flex flex-col w-full bg-blue-800 bg-opacity-50 rounded-lg p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                      <div className="col-span-1 sm:col-span-3 md:col-span-1">
                        <p className="text-white font-semibold text-sm sm:text-base md:text-lg">
                          Pickup: <span className="font-normal">{request.pickup}</span>
                        </p>
                      </div>
                      <div className="col-span-1 sm:col-span-3 md:col-span-1">
                        <p className="text-white font-semibold text-sm sm:text-base md:text-lg">
                          Drop: <span className="font-normal">{request.drop}</span>
                        </p>
                      </div>
                      <div className="col-span-1 sm:col-span-3 md:col-span-1">
                        <p className="text-white font-semibold text-sm sm:text-base md:text-lg">
                          Fare: <span className="font-normal text-base sm:text-lg md:text-2xl">₹{request.fare}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Always at the bottom */}
                  <div className="flex justify-center sm:justify-end space-x-3 sm:space-x-4 mt-3 sm:mt-4">
                    <button
                      className="bg-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition flex-1 sm:flex-none max-w-[120px] sm:max-w-none"
                      onClick={() => {
                        setCurrentRide(request)
                        setConfirmRidePanelShow(true)
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 transition flex-1 sm:flex-none max-w-[120px] sm:max-w-none"
                      onClick={() => declineHandler(request)}
                    >
                      Decline
                    </button>
                  </div>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ConfirmRidePanel setConfirmRidePanelShow={setConfirmRidePanelShow} request={currentRide} />
      )}
    </div>
  )
}

export default RideRequest

