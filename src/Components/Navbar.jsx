import React, { useState } from 'react';
import LoginPopup from './LoginPopup';

const Navbar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-2xl font-bold">Your Logo</div>
            <div className="hidden md:flex space-x-4">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-sm"
                onClick={handleOpenPopup}
            >
                Login
            </button>
            {isPopupOpen &&
                <LoginPopup
                    handleOpenPopup={handleOpenPopup}
                    setIsPopupOpen={setIsPopupOpen}
                    isPopupOpen={isPopupOpen}
                />}
        </nav>
    );
};

export default Navbar;
