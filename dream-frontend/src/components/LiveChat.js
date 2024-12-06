import React, { useState, useEffect } from 'react';

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:3001');
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        return () => newSocket.close();
    }, []);

    const sendMessage = () => {
        if (socket && input) {
            socket.send(JSON.stringify({ content: input }));
            setInput('');
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
                    <p key={index} className="text-gray-800">{msg.content}</p>
                ))}
            </div>
            <div className="mt-5 flex">
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
    );
};

export default LiveChat;
