import React, { useState } from 'react';
import './App.css';
import Landing from './components/Landing';
import PostDream from './components/PostDream';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null); // Track the logged-in user

  return (
    <Router>
        <div className="min-h-screen p-5">
            <h1 className="text-3xl font-bold text-center mb-10">Dream Dialogue App</h1>
            <Routes>
                {/* Define routes */}
                <Route path="/" element={!user ? <Landing setUser={setUser} /> : <Navigate to="/postdream" />} />
                <Route path="/postdream" element={user ? <PostDream userId={user._id} /> : <Navigate to="/" />} />
            </Routes>
        </div>
    </Router>
);
}

export default App;