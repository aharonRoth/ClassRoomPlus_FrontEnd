import React, { useState } from 'react';
import axios from 'axios';
import Header from './../../Components/header/Header';
import './../LogIn/Login.css'
import { useNavigate } from 'react-router-dom';





const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role:'user'
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic form validation
        if (formData.password !== formData.confirmPassword) {
            setFormErrors({ confirmPassword: "Passwords don't match" });
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/users/signup`, formData);
            console.log('User registered:', response.data);
            navigator('/login');
            // send amessage to the user to check his email
            alert('Please check your email to verify your account');
            // Handle successful registration (e.g., redirect to login or dashboard)
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
            // Handle registration errors (e.g., show error message)
        }
    };

    return (
        <div>
            <Header showLinks={false} />
            <div className='maincontainer1'>
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2 className="login-title">Sign Up</h2>
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
                        <button type="submit" className="login-button w-full py-2 rounded-md text-white font-semibold">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
