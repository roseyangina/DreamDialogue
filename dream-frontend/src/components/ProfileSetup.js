import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = ({ user, updateProfile }) => {
    //const [username, setName] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate(); // Add navigation

    const handleSaveProfile = async () => {
        console.log('handleSaveProfile triggered');
        try {
            // Send bio to the backend to update it for the logged-in user
            const response = await axios.put(`https://dreamdialogue-production.up.railway.app/api/products/profile-setup/${user._id}`, {
                bio,
            });

            console.log('Profile updated on backend:', response.data);
            // Simulate API call to save the profile
            console.log('Saving profile:', { bio });
            updateProfile({ bio });
            
            //alert('Profile saved successfully!');
            console.log('Profile updated, navigating to PostDream...');
            navigate('/postdream'); // Navigate to PostDream after saving profile

        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-5 text-center text-black">Set Up Your Profile</h2>

            <label className="block text-lg font-medium mb-1 text-black">Short bio:</label>
            <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
                onClick={handleSaveProfile}
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
                Save Profile
            </button>
        </div>
    );
};

export default ProfileSetup;
