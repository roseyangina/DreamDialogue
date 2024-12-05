import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ onLogout }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleViewProfile = () => {
        console.log('Navigating to /profile');
        setShowMenu(false); // Close the menu
        navigate('/profile'); // Navigate to the "View Profile" page
    };
    

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
                onClick={() => setShowMenu(!showMenu)}
            >
                <span role="img" aria-label="Profile">
                    👤
                </span>
            </button>
            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md">
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={handleViewProfile}
                    >
                        View Profile
                    </button>
                    <button
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
