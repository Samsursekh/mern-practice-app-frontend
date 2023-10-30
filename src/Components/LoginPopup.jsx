import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const LoginPopup = ({ handleOpenPopup, setIsPopupOpen, isPopupOpen }) => {
  const navigate = useNavigate();

    const handleAdminClick = () => {
        alert("Clicked Added.......");
    }

    const handleAlert = () => {
        // alert("Clicked Added.......");
        navigate('/admin')
    }
    return (
        <div className="absolute right-4 top-14 z-50">
            <div className="bg-white p-6 w-full rounded-sm shadow-lg">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md block mb-4"
                >
                    User
                </button>
                <Link to={'/admin'}>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md block"
                       onClick={handleAlert}
                   >
                        Admin
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LoginPopup;
