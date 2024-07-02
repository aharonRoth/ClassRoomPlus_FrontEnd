import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ showLinks, showPartLinks }) => {
    const [user, setUser] = useState({});
    const [isuse, setIsUse] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userinfo) {
            setIsUse(false);
        } else {
            setUser(userinfo);
            if (userinfo.role === 'admin') {
                setIsAdmin(true);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    const handleSelectChange = (e) => {
        if (e.target.value === 'logout') {
            handleLogout();
        // } else if (e.target.value === '/edit-profile') {
        //     handleEditProfileOpen();
        } else {
            window.location.href = e.target.value;
        }
    };

    // const handleEditProfileOpen = () => {
    //     console.log('Edit Profile Open');
    //     setIsEditProfileOpen(true);
    // };

    // const handleEditProfileClose = () => {
    //     setIsEditProfileOpen(false);
    // };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header d-flex flex-row justify-content-between align-items-center sticky-top bg-dark text-white p-3" style={{ height: '60px' }}>
            <div className="d-flex align-items-center">
                <img src="src/assets/logo1.jpg" alt="Site Logo" className="logo-image" />
                <h1 className="fs-4">Class Room +</h1>
            </div>
            <button className="menu-toggle-button" onClick={toggleMenu}>
                &#9776; {/* Hamburger menu icon */}
            </button>
            <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                <ul className="d-flex list-unstyled mb-0">
                    {showLinks && !isAdmin && isuse && (
                        <>
                            {user.avatar && <img className='friendimg' src={user.avatar} alt='avatar' />}
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link text-white px-3">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link text-white px-3">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/App" className="nav-link text-white px-3">Courses</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <select className="nav-link bg-dark text-white px-3" defaultValue="" onChange={handleSelectChange}>
                                    <option value="" disabled>Account</option>
                                    <option value="/profile">View Profile</option>
                                    <option value="/edit-profile">Edit Profile</option>
                                    <option value="/change-password">Change Password</option>
                                    <option value="logout">Logout</option>
                                </select>
                            </li>
                        </>
                    )}
                    {showPartLinks && !isAdmin && isuse && (
                        <>
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link text-white px-3">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link text-white px-3">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <select className="nav-link bg-dark text-white px-3" defaultValue="#" onChange={handleSelectChange}>
                                    <option value="" disabled>Account</option>
                                    <option value="/profile">View Profile</option>
                                    <option value="/edit-profile">Edit Profile</option>
                                    <option value="/change-password">Change Password</option>
                                    <option value="logout">Logout</option>
                                </select>
                            </li>
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link text-white px-3">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link text-white px-3">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/App" className="nav-link text-white px-3">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link text-white px-3">Admin</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <select className="nav-link bg-dark text-white px-3" defaultValue="#" onChange={handleSelectChange}>
                                    <option value="#" disabled>Account</option>
                                    <option value="/profile">View Profile</option>
                                    <option value="/edit-profile">Edit Profile</option>
                                    <option value="/change-password">Change Password</option>
                                    <option value="logout">Logout</option>
                                </select>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            {/* {isEditProfileOpen && <EditProfile onClose={handleEditProfileClose} />} */}
        </header>
    );
};

Header.propTypes = {
    showLinks: PropTypes.bool.isRequired,
    showPartLinks: PropTypes.bool
};

export default Header;
