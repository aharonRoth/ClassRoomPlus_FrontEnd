import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatroom.css';

const Chatroom = ({ courseId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user', { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUser();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/posts/course/${courseId}`, {
                withCredentials: true
            });
            setMessages(response.data.posts); // Assuming response.data.posts is an array of posts
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [courseId]); // Fetch messages whenever courseId changes

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            await axios.post(
                'http://localhost:3000/posts',
                { courseId, postData: newMessage },
                { withCredentials: true }
            );
            setNewMessage('');
            fetchMessages(); // Refresh messages
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleDeleteMessage = async (postId) => {
        try {
            await axios.delete(`http://localhost:3000/posts/${postId}`, {
                withCredentials: true
            });
            fetchMessages(); // Refresh messages
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div className="chatroom-container">
            <div className="messages-container">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`message ${message.userId === user?._id ? 'my-message' : 'other-message'}`}
                    >
                        <div>{message.postData}</div>
                        {message.userId === user?._id && (
                            <button onClick={() => handleDeleteMessage(message._id)}>Delete</button>
                        )}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatroom;
