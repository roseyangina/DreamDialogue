import React from 'react';

const ViewProfile = ({ user }) => {
    if (!user) {
        console.log('User in ViewProfile:', user);
        return <p>Loading...</p>; // Handle case where user data isn't available
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-5 text-center">Profile</h2>
            <div className="text-center">
                <img
                    src="https://via.placeholder.com/100" // Placeholder image for the user profile
                    alt="Profile"
                    className="mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">{user.username}</h3>
                <p className="text-gray-600">{user.bio}</p>
            </div>
        </div>
    );
};

export default ViewProfile;
