import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ showLinks, showPartLinks }) => {
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    return (
        <header className="d-flex flex-row justify-content-between align-items-center sticky-top bg-dark text-white p-3" style={{ height: '60px' }}>
            <div className="d-flex align-items-center">
                <img src="./../../img/logo.png" alt="Site Logo" className="logo-image me-3" />
                <h1 className="fs-4">Class Room +</h1>
            </div>
            {showLinks && (
                <nav>
                    <ul className="d-flex list-unstyled mb-0">
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
                            <select className="nav-link bg-dark text-white px-3" id="navbarDropdown" onChange={(e) => window.location.href = e.target.value}>
                                <option value="" selected disabled>Account</option>
                                <option value="/profile">View Profile</option>
                                <option value="/edit-profile">Edit Profile</option>
                                <option value="/change-password">Change Password</option>
                                <option value="/" onClick={handleLogout}>Logout</option>
                            </select>
                        </li>
                    </ul>
                </nav>
            )}
            {showPartLinks && (
                    <nav>
                    <ul className="d-flex list-unstyled mb-0 w-100">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link text-white px-3">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <select className="nav-link bg-dark text-white px-3" id="navbarDropdown" onChange={(e) => window.location.href = e.target.value}>
                                <option value="#" selected disabled>Account</option>
                                <option value="/profile">View Profile</option>
                                <option value="/edit-profile">Edit Profile</option>
                                <option value="/change-password">Change Password</option>
                                <option value="#" onClick={handleLogout}>Logout</option>
                            </select>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

Header.propTypes = {
    showLinks: PropTypes.bool.isRequired
};

export default Header;



// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

// const Header = ({ showLinks }) => {
//     const handleLogout = () => {
//         localStorage.removeItem('userInfo');
//         window.location.href = '/login';
//     };

//     return (
//         <header className="d-flex flex-row justify-content-between align-items-center sticky-top bg-dark text-white p-3" style={{ height: '60px' }}>
//             <div className="d-flex align-items-center">
//                 <img src="./../../img/logo.png" alt="Site Logo" className="logo-image me-3" />
//                 <h1 className="fs-4">Class Room +</h1>
//             </div>
//             {showLinks && (
                 
//                 <nav>
//                     <ul className="d-flex list-unstyled mb-0">
//                         <li className="nav-item">
//                             <Link to="/dashboard" className="nav-link text-white px-3">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/about" className="nav-link text-white px-3">About</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/App" className="nav-link text-white px-3">Courses</Link>
//                         </li>
//                         <li className="nav-item dropdown">
                            
//                             <a className="nav-link text-white px-3 dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 Account


//                                 <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                     <li>
//                                         <Link to="/profile" className="dropdown-item">View Profile</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/edit-profile" className="dropdown-item">Edit Profile</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/change-password" className="dropdown-item">Change Password</Link>
//                                     </li>
//                                     <li>
//                                         <button className="dropdown-item" onClick={handleLogout}>Logout</button>

//                                     </li>
//                                 </ul>
//                             </a>
//                         </li>
//                     </ul>
//                 </nav>
//             )}
//         </header>
//     );
// };

// Header.propTypes = {
//     showLinks: PropTypes.bool.isRequired
// };

// export default Header;
