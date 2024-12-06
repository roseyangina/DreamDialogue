import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostDream = ({ user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]); // Store all posts

    useEffect(() => {
        console.log('PostDream component mounted');
        return () => {
            console.log('PostDream component unmounted');
        };
    }, []);

    // Fetch existing posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://dreamdialogue-production.up.railway.app/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    // Handle new post submission
    const handlePostDream = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting to post dream with:', {
                username: user.username, // Log the username being sent
                title,
                content,
            });
            const response = await axios.post('https://dreamdialogue-production.up.railway.app/api/posts', {
                username: user.username,
                title,
                content,
            });
            console.log('Dream post response:', response.data);
            setPosts([response.data, ...posts]); // Add the new post at the top
            setTitle(''); // Clear the form
            setContent('');
        } catch (error) {
            console.error('Error posting dream:', error);
            alert('Failed to post dream');
        }
    };


    const handleReaction = async (postId, emoji) => {
        try {
            const response = await axios.put(`https://dreamdialogue-production.up.railway.app/api/posts/${postId}/react`, {
                emoji,
                userId: user._id,
            });
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, reactions: response.data.reactions }
                        : post
                )
            );
        } catch (error) {
            console.error('Error reacting to post:', error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-5 p-2">
            {/* Prompt to Post a Dream */}
            <div className="bg-white rounded shadow-md p-4 mb-10">
                <h2 className="text-2xl font-semibold mb-0 text-center">Post a Dream</h2>
                <form onSubmit={handlePostDream} className="space-y-3">
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
                        Post
                    </button>
                </form>
            </div>
    
            {/* Display Posts */}
            <div className="space-y-6">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white rounded shadow-md p-5">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-black mb-2">{post.title}</h3>
                        {/* Meta information */}
                        <p className="text-sm text-gray-500 mb-4">
                            @{post.username} at{' '}
                            {new Date(post.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                        {/* Content */}
                        <p className="text-black mb-4">{post.content}</p>
    
                        {/* Like and Reaction Section */}
                        <div className="mt-4 flex items-center space-x-4">
                        
                            {/* Reaction Buttons */}
                            <button
                                onClick={() => handleReaction(post._id, '👍')}
                                className="text-black hover:underline"
                            >
                                👍 {post.reactions && post.reactions['👍'] ? post.reactions['👍'] : 0}
                            </button>
                            <button
                                onClick={() => handleReaction(post._id, '❤️')}
                                className="text-black hover:underline"
                            >
                                ❤️ ({post.reactions?.['❤️'] || 0})
                            </button>
                            <button
                                onClick={() => handleReaction(post._id, '😂')}
                                className="text-black hover:underline"
                            >
                                😂 ({post.reactions?.['😂'] || 0})
                            </button>
                            <button
                                onClick={() => handleReaction(post._id, '😢')}
                                className="text-black hover:underline"
                            >
                                😢 {post.reactions && post.reactions['😢'] ? post.reactions['😢'] : 0}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}    

export default PostDream;
