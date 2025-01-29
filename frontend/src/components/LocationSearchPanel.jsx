import React, { useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css';
import axios from "axios";
import debounce from "lodash.debounce";

const LocationSearchPanel = (props) => {

    const { pickup, drop, setPickup, setDrop, activeInput } = props;

    const [locations, setLocations] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = debounce(async () => {
            try {
                setError("");
                setLocations([]);
                setLoading(true);
                
                let place = (activeInput === "pickup") ? pickup : drop;

                if(!place || place.length < 3) {
                    setLoading(false);
                    setLocations([]);
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-suggestions`, {
                    params: {
                        address: place
                    },
                    withCredentials: true
                });

                setLocations(response.data || []);
                setLoading(false);

            } catch (error) {
                setError(error.message);
                setLocations([]);
                console.error(error.message);
            }
        }, 1000);

        fetchData();

        return () => fetchData.cancel();
    },[pickup, drop, activeInput]);

    const clickHandler = (elem) => {
        if (activeInput === "pickup")
            setPickup(elem);
        else if (activeInput === "drop")
            setDrop(elem);
    }

    return (
        <div>
            {loading && <h2 className="text-sm mt-3 text-gray-800">Loading...</h2>}
            {error && <h2 className="text-sm mt-3 text-red-600">{error}</h2>}
            {locations.length === 0 && !loading && <h2 className="text-sm mt-3 text-gray-600">No locations found.</h2>}
            {locations.map((location, index) => {
                return (
                    <div
                        key={index} className="flex justify-start items-center gap-2 my-3 border-2 hover:bg-gray-200 active:border-black cursor-pointer"
                        onClick={() => clickHandler(location.name)}
                    >
                        <h2 className="p-1 bg-gray-300 rounded-full"><i className="ri-map-pin-fill"></i></h2>
                        <h4 className="text-xs font-medium">{location.name}</h4>
                    </div>
                );
            })
            }
        </div>
    );
};

export default LocationSearchPanel;