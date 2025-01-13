import React from "react";
import uber_car from "../assets/ride.png"

function RidePricing(props) {

    const {setPricingShow, setConfirmRidePanelShow} = props;

    const ClickHandler = () => {
        setPricingShow(false);
        setConfirmRidePanelShow(true);
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-5">Choose a veicle</h2>
            <div 
                className="align flex w-full items-center justify-between gap-2 px-3 py-4 mb-2 border-2 border-gray-500 hover:bg-gray-200 active:border-black cursor-pointer"
                onClick={ClickHandler}   
            >

                <img src={uber_car}
                    alt="uber-car" 
                    className="h-[75px]" 
                />

                <div className="w-1/2 space-y-1 text-center">
                    <h4 className="text-lg font-semibold">UberGo <span><i className="ri-map-pin-user-fill"></i></span>4</h4>
                    <h5 className="text-sm font-medium">2 mins away</h5>
                    <p className="text-xs text-gray-500">Affordable compact rides</p>
                </div>

                <h2 className="text-lg font-bold">₹190</h2>
            </div>

            <div 
                className="align flex w-full items-center justify-between gap-2 px-3 py-4 mb-2 border-2 border-gray-500 hover:bg-gray-200 active:border-black cursor-pointer"
                onClick={ClickHandler}    
            >
                
                <img 
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_384,w_576/v1649230978/assets/a2/553a18-2f77-4722-a4ba-f736f4cb405e/original/Uber_Moto_Orange_558x372_pixels_Desktop.png" 
                    alt="uber-moto" 
                    className="h-12" 
                />

                <div className="w-1/2 space-y-1 text-center mx-auto">
                    <h4 className="text-lg font-semibold">UberGo <span><i className="ri-map-pin-user-fill"></i></span>1</h4>
                    <h5 className="text-sm font-medium">2 mins away</h5>
                    <p className="text-xs text-gray-500">Affordable compact rides</p>
                </div>

                <h2 className="text-lg font-bold">₹65</h2>
            </div>

            <div 
                className="align flex w-full items-center justify-between gap-2 px-3 py-4 mb-2 border-2 border-gray-500 hover:bg-gray-200 active:border-black cursor-pointer"
                onClick={ClickHandler}    
            >
                
                <img 
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_384,w_576/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" 
                    alt="uber-auto" 
                    className="h-12" 
                />

                <div className="w-1/2 space-y-1 text-center mx-auto">
                    <h4 className="text-lg font-semibold">UberGo <span><i className="ri-map-pin-user-fill"></i></span>3</h4>
                    <h5 className="text-sm font-medium">2 mins away</h5>
                    <p className="text-xs text-gray-500">Affordable compact rides</p>
                </div>

                <h2 className="text-lg font-bold">₹45</h2>
            </div>
        </div>
    );
};

export default RidePricing;