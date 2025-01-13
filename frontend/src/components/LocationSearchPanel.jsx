import React from "react";
import 'remixicon/fonts/remixicon.css'

function LocationSearchPanel(props) {

    const {setPickup, setDrop, activeInput} = props;

    let locations = [
        "N.C.Ghosh Sarani, near station, seoraphuli",
        "N.C.Ghosh Sarani, near station, seoraphuli"
    ];

    const clickHandler = (elem) => {
        if(activeInput === "pickup")
            setPickup(elem);
        else if(activeInput === "drop")
            setDrop(elem);
    }

    return (
        <div>
            {locations.map((location, index) => {
                return (
                    <div 
                        key={index} className="flex justify-start items-center gap-2 my-3 border-2 hover:bg-gray-200 active:border-black cursor-pointer"
                        onClick={() => clickHandler(location)}
                    >
                        <h2 className="p-1 bg-gray-300 rounded-full"><i className="ri-map-pin-fill"></i></h2>
                        <h4 className="text-xs font-medium">{location}</h4>
                    </div>
                );
            })
            }
        </div>
    );
};

export default LocationSearchPanel;