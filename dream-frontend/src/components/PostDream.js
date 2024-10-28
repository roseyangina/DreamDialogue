import React, { useState } from 'react';
import axios from 'axios';

const PostDream = ({ userId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handlePostDream = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/products/${userId}/dream`, {
                title,
                content,
            });
            alert('Dream posted successfully!');
        } catch (error) {
            console.error('Error posting dream:', error);
            alert('Failed to post dream');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-5 text-center">Post a Dream</h2>
            <form onSubmit={handlePostDream} className="space-y-4">
                <input
                    type="text"
                    placeholder="Dream Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Dream Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                    Post Dream
                </button>
            </form>
        </div>
    );
};

export default PostDream;
