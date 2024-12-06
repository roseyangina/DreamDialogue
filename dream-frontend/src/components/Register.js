import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Registering user with:', { username, password });
        try {
            console.log('Sending data:', { username, password });
            const response = await axios.post('https://dreamdialogue-production.up.railway.app/api/products/register', {
                username,
                password,
            });
            // Set the full user object in state and localStorage
        console.log('Register response:', response.data);
        setUser(response.data); // Save user data to App state
        //alert('Registration successful!');
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Failed to register');
    }
};

    return (
        <div className="register-container max-w-md mx-auto mt-2 p-5 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-2 text-center">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
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
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
