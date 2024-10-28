import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

const Landing = ({ setUser }) => {
    const [showForm, setShowForm] = useState(null); // 'register' or 'login'

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md text-center">
            <h2 className="text-3xl font-bold mb-5">Welcome to Dream Dialogue</h2>
            <p className="text-lg text-gray-600 mb-5">Get Started!</p>
            {!showForm && (
                <div>
                    <button
                        onClick={() => setShowForm('register')}
                        className="landing-button m-2 p-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
                    >
                        Register
                    </button>
                    <button
                        onClick={() => setShowForm('login')}
                        className="landing-button m-2 p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            )}
            {showForm === 'register' && <Register setUser={setUser}  />}
            {showForm === 'login' && <Login setUser={setUser} />}
        </div>
    );
};

export default Landing;
