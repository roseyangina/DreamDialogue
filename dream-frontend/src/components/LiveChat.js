import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [post, setPost] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:3001');
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const postId = params.get('postId');
        if (postId) {
            console.log(`Fetching post with ID: ${postId}`); // Add logging
            axios.get(`http://localhost:3001/api/posts/${postId}`)
                .then(response => {
                    console.log('Post fetched successfully:', response.data); // Add logging
                    setPost(response.data);
                })
                .catch(error => console.error('Error fetching post:', error));
        }
    }, [location.search]);

    const sendMessage = () => {
        if (socket && input) {
            socket.send(JSON.stringify({ content: input, post }));
            setInput('');
            setPost(null); // Reset post after sending the message
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-5">
            <div className="bg-white rounded shadow-md p-5">
                <h2 className="text-gray-500 text-center text-lg">
                    You have entered the live chat. Observe community guidelines.
                </h2>
            </div>
            <div className="bg-white rounded shadow-md mt-5 p-5 h-96 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-4">
                        <p className="text-gray-800">{msg.content}</p>
                        {msg.post && (
                            <div className="mt-2 p-2 border border-gray-300 rounded">
                                <h3 className="font-bold text-black">{msg.post.title}</h3>
                                <p className="text-black">{msg.post.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-5 flex flex-col">
                {post && (
                    <div className="mb-2 p-2 bg-yellow-100 border border-yellow-300 rounded">
                        <p className="text-yellow-800">You are referencing a post in this message.</p>
                    </div>
                )}
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveChat;
