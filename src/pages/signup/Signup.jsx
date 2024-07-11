import React, { useState } from 'react';
import axios from 'axios';
import Header from './../../Components/header/Header';
import AvatarModal from './../../../src/assets/avatars/AvatarModal';
import './../LogIn/Login.css';
import './signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        avatar: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [showAvatarModal, setShowAvatarModal] = useState(false);

    const avatars = [
        'src/assets/avatars/avatar_1.jpg',
        'src/assets/avatars/avatar_2.jpg',
        'src/assets/avatars/avatar_3.jpg',
        'src/assets/avatars/avatar_4.jpg',
    ];

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setFormErrors({ confirmPassword: "Passwords don't match" });
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/users/signup', formData);
            navigate('/login');
            alert('Please check your email to verify your account');
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
        }
    };

    const handleAvatarSelect = (selectedAvatar) => {
        setFormData({ ...formData, avatar: selectedAvatar });
        setShowAvatarModal(false);
    };

    return (
        <div>
            <Header showLinks={false} />
            <div className='maincontainer1'>
                <div className="login-container">
                    <form className="login-form d-flex" onSubmit={handleSubmit}>
                        <h2 className="login-title">Sign Up</h2>
                        <div className="mb-4">
                            <label htmlFor="avatar" className="login-label">Avatar</label>
                            <div className="avatar-selection">
                                <button type="button" className="login-button w-full py-2 rounded-md text-white font-semibold" onClick={() => setShowAvatarModal(true)}>Choose Avatar</button>
                                {formData.avatar && <img src={formData.avatar} alt="Selected Avatar" className="selected-avatar" />}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="login-label">First Name</label>
                            <input type="text" className="login-input" id="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="login-label">Last Name</label>
                            <input type="text" className="login-input" id="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="login-label">Email address</label>
                            <input type="email" className="login-input" id="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="login-label">Phone</label>
                            <input type="tel" className="login-input" id="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="login-label">Password</label>
                            <input type="password" className="login-input" id="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
                            <input type="password" className="login-input" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            {formErrors.confirmPassword && <div className="text-red-500">{formErrors.confirmPassword}</div>}
                        </div>
                        <button type="submit" className="login-button w-full py-2 rounded-md text-white font-semibold" >Sign Up</button>
                    </form>
                </div>
            </div>
            {showAvatarModal && <AvatarModal avatars={avatars} onSelect={handleAvatarSelect} onClose={() => setShowAvatarModal(false)} />}
        </div>
    );
};

export default SignUp;
