import React from "react";
import { Link } from "react-router-dom";

const CaptainHome = () => {
    return (
        <div>
            <h1>Captain Home</h1>
            <Link to="/captain-logout">Logout</Link>
        </div>
    );
};

export default CaptainHome;