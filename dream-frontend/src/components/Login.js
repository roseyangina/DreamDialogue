import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/products/login', {
                username,
                password,
            });
            alert('Login successful!');
            setUser(response.data); // Set the logged-in user data to enable access to PostDream
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to login');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
