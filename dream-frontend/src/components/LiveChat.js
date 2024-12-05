import React from 'react';

const LiveChat = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-5">
            {/* Live Chat Header */}
            <div className="bg-white rounded shadow-md p-5">
                <h2 className="text-gray-500 text-center text-lg">
                    You have entered the live chat. Observe community guidelines.
                </h2>
            </div>

            {/* Placeholder for Chat Messages */}
            <div className="bg-white rounded shadow-md mt-5 p-5 h-96 overflow-y-auto">
                <p className="text-center text-gray-500">
                    Chat messages will appear here once live chat is implemented.
                </p>
            </div>
        </div>
    );
};

export default LiveChat;
