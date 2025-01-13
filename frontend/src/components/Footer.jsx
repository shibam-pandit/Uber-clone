import React from "react";

function Footer() {
    return (
        <footer className="bg-[#dfa674] py-6 text-gray-900">
            <div className="container mx-auto px-6 text-center md:px-12">
                <p>&copy; {new Date().getFullYear()} Uber Clone. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;