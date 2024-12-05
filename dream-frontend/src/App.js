import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import ProfileSetup from './components/ProfileSetup.js';
import PostDream from './components/PostDream';
import ProfileMenu from './components/ProfileMenu'; 
import ViewProfile from './components/ViewProfile';
import LiveChat from './components/LiveChat';


function App() {
    const [user, setUser] = useState(null); // Track the logged-in user
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (user) {
            const currentPath = window.location.pathname; // Get current URL path
    
            // If bio is missing, always redirect to profile-setup
            if (!user.bio && currentPath !== '/profile-setup') {
                console.log('Redirecting to /profile-setup');
                navigate('/profile-setup');
                return; // Prevent further navigation logic
            }
    
            // If bio is present and not on a valid page, redirect to /postdream
            if (
                user.bio && 
                currentPath !== '/postdream' && 
                currentPath !== '/profile' && 
                currentPath !== '/livechat'
            ) {
                console.log('Redirecting to /postdream');
                navigate('/postdream');
            }
        } else {
            // If no user is logged in, redirect to login/register
            if (window.location.pathname !== '/') {
                console.log('Redirecting to /');
                navigate('/');
            }
        }
    }, [user, navigate]);
        
       
    // Load user data from localStorage when the app starts
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        console.log('User from localStorage after login/register:', savedUser);
        if (savedUser) {
            setUser(JSON.parse(savedUser)); // Load user from localStorage
        } else {
            setUser(null); // Set to null if no user is found
        }
    }, []);
    

    // Save user data to localStorage whenever it changes
    useEffect(() => {
        console.log('User in App.js on mount or change:', user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Save user data
        } else {
            localStorage.removeItem('user'); // Remove user data on logout
        }
    }, [user]);
    

    const handleLogout = () => {
        setUser(null); // Clear the user session
        navigate('/'); // Redirect to landing page
    };
    const updateProfile = (updatedInfo) => {
        console.log('Updating profile with:', updatedInfo);
        setUser((prevUser) => ({
            ...prevUser,
            bio: updatedInfo.bio,
        }));
    };
    console.log('Updated user in App.js:', user);

  return (

    <div className="min-h-screen p-5">
    {/* Navbar */}
    <div className="relative text-white shadow-md flex flex-col items-center">
        {/* Title Centered */}
        <h1
            className="text-4xl font-bold cursor-pointer"
            onClick={() => navigate('/postdream')}
        >
            Dream Dialogue App
        </h1>

        {/* Links Below Title */}
        {/* Posts and LiveChat Buttons (visible only on PostDream page) */}
        {(window.location.pathname === '/postdream' || window.location.pathname === '/livechat') && (
        <div className="flex space-x-8 mt-0">
            <button
                onClick={() => navigate('/postdream')}
                className="text-white hover:underline text-base"
            >
                Posts
            </button>
            <button
                onClick={() => navigate('/livechat')}
                className="text-white hover:underline text-base"
            >
                Live Chat
            </button>
        </div>
        )}

        {/* Profile Menu Far Right */}
        {user && user.bio && user.username && (
            <div className="absolute right-5 top-5">
                <ProfileMenu onLogout={handleLogout} />
            </div>
        )}
    </div>

    {/* Routes */}
    <Routes>
        <Route path="/" element={!user ? <Landing setUser={setUser} /> : <Navigate to="/postdream" />} />
        <Route path="/postdream" element={user ? <PostDream userId={user.userId} user={user} /> : <Navigate to="/" />} />
        <Route path="/profile-setup" element={user ? <ProfileSetup user={user} updateProfile={updateProfile} /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <ViewProfile user={user} /> : <Navigate to="/" />} />
        <Route path="/livechat" element={user ? <LiveChat /> : <Navigate to="/" />} />
    </Routes>
</div>

);
}

export default App;