import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ onClose }) => {
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [editField, setEditField] = useState('');

    const avatars = [
        'src/assets/avatars/avatar_1.jpg',
        'src/assets/avatars/avatar_2.jpg',
        'src/assets/avatars/avatar_3.jpg',
        'src/assets/avatars/avatar_4.jpg',
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                setUser(userInfo.data.user);
                setFirstName(userInfo.data.user.firstName);
                setLastName(userInfo.data.user.lastName);
                setAvatar(userInfo.data.user.avatar);
            }
        };
        fetchUser();
    }, []);

    const handleUpdate = async (fieldName) => {
        try {
            let updatedUser = {};
            if (fieldName === 'firstName') {
                updatedUser = { ...user, firstName };
            } else if (fieldName === 'lastName') {
                updatedUser = { ...user, lastName };
            } else if (fieldName === 'password') {
                updatedUser = { ...user, password };
            } else if (fieldName === 'avatar') {
                updatedUser = { ...user, avatar };
            }
            const response = await axios.put(`http://localhost:3000/users/${user._id}`, updatedUser, { withCredentials: true });
            localStorage.setItem('userInfo', JSON.stringify(response));
            alert('Profile updated successfully');
            setEditField('');
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
        }
    };

    const handleAvatarClick = (selectedAvatar) => {
        setAvatar(selectedAvatar);
    };

    return (
        <div className="container">
            <div className="card mt-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2>Profile</h2>
                    <button className="btn btn-outline-danger" onClick={onClose}>&times;</button>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <strong>First Name:</strong>
                        {editField === 'firstName' ? (
                            <div className="edit-field">
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={() => handleUpdate('firstName')}>Save</button>
                            </div>
                        ) : (
                            <span className="view-field">
                                {user.firstName}
                                <button className="btn btn-primary" onClick={() => setEditField('firstName')}>Edit</button>
                            </span>
                        )}
                    </div>
                    <div className="mb-3 ">
                        <strong>Last Name:</strong>
                        {editField === 'lastName' ? (
                            <div className="edit-field">
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={() => handleUpdate('lastName')}>Save</button>
                            </div>
                        ) : (
                            <span className="view-field">
                                {user.lastName}
                                <button className="btn btn-primary" onClick={() => setEditField('lastName')}>Edit</button>
                            </span>
                        )}
                    </div>
                    <div className="mb-3">
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className="mb-3">
                        <strong>Phone:</strong> {user.phone}
                    </div>
                    <div className="mb-3">
                        <strong>Role:</strong> {user.role}
                    </div>
                    <div className="mb-3">
                        <strong>Password:</strong>
                        {editField === 'password' ? (
                            <div className="edit-field">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={() => handleUpdate('password')}>Save</button>
                            </div>
                        ) : (
                            <span className="view-field">
                                ********
                                <button className="btn btn-primary" onClick={() => setEditField('password')}>Edit</button>
                            </span>
                        )}
                    </div>
                    {user.avatar && (
                        <div className="mb-3 img1">
                            <strong>Avatar:</strong>
                            {editField === 'avatar' ? (
                                <div className="edit-field">
                                    <div className="avatar-selection ">
                                        {avatars.map((avatarUrl, index) => (
                                            <img 
                                                key={index}
                                                src={avatarUrl}
                                                alt={`avatar-${index + 1}`}
                                                className={avatar === avatarUrl ? 'selected' : ''}
                                                onClick={() => handleAvatarClick(avatarUrl)}
                                            />
                                        ))}
                                    </div>
                                    <button className="btn btn-primary" onClick={() => handleUpdate('avatar')}>Save</button>
                                </div>
                            ) : (
                                <span className="view-field">
                                    <img src={user.avatar} alt="Avatar" className="img-thumbnail" />
                                    <button className="btn btn-primary" onClick={() => setEditField('avatar')}>Edit</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
