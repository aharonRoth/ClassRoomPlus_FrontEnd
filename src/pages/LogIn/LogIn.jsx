import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '././../../Components/header/Header';
import Footer from './../../Components/footer/Footer';

import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [missing, setMissing] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (missing || error) {
      const timer = setTimeout(() => {
        setMissing('');
        setError('');
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [missing, error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    try {
      const { data } = await axios.post(`http://localhost:3000/users/login`, { email, password }, { withCredentials: true });

      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/dashboard');
        return;
      }
    } catch (error) {
      if (!email && !password) {
        setMissing('The email and password are missing');
      } else if (!email || !password) {
        setMissing('The email or password is missing');
      } else {
        setError('You are not in the system. Do you want to sign up?');
      }
    }
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <>
      {/*the header should be with no links  */}
      <Header showLinks={false} />
      <div className='maincontainer1'>
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2 className="login-title">LOGIN</h2>
            <label className="login-label">Email:</label>
            <input
              className="login-input"
              type="email"
              autoComplete="email" //  this is for the browser to remember the email
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="login-label">Password:</label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='bottons'>
              <button className="login-button" type="submit">Login</button>
              <button className="login-button" onClick={() => navigate('/Signup')}>Signup</button>
            </div>
            {missing && (
              <div className='text-white'>
                {missing}
              </div>
            )}
            {error && (
              <div className='text-white'>
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from '././../../Components/header/Header'
// import Footer from './../../Components/footer/Footer'

// import './Login.css'

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [missing, setMissing] = useState('');
//   const [error, setError] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const config = {
//       headers: {
//         'Access-Control-Allow-Origin': '*'
//       }
//     };
//     try {
//       const { data } = await axios.post(`http://localhost:3000/users/login`, { email, password }, { withCredentials: true });

     
//       if (data) {
//         localStorage.setItem('userInfo', JSON.stringify(data));
//         navigate('/dashboard');
//         return;
//       }
     
//     } catch (error) {
//       if (!email && !password) {
//         setMissing('');
//         setError('');
//         setMissing('The email and password are missing');
//       } else {
//         if (!email || !password) {
//           setMissing('');
//           setError('');
//           setMissing('The email or password is missing');
//           return;
//         } else {
//           setMissing('');
//           setError('');
//           setError('You are not in the system. Do you want to sign up?');
//         }
//       }
//     }
//     navigate('/');
//   };
//     const handleLogout = () => {
//         localStorage.removeItem('userInfo');
//         window.location.href = '/login';
//     };

//   return (
//     <>
//     {/*the heater should be with no links  */}
   
//     <Header showLinks={false} />
//       <div className='maincontainer1'>
//         <div className="login-container">
//           <form className="login-form" onSubmit={handleLogin}>
//           <h2 className="login-title">LOGIN</h2>
          
//             <label className="login-label">Email:</label>
//             <input
//               className="login-input"
//               type="email"
//               autoComplete="email" //  this is for the browser to remember the email
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label className="login-label">Password:</label>
//             <input
//               className="login-input"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

          
//             <div className='bottons'>
//             <button className="login-button" type="submit">Login</button>
//             <button className="login-button" onClick={() => navigate('/Signup')}>Signup</button>
//             </div>
//             {missing && (
//               <div className='text-white '>
//               {missing}
//               </div>
//             )}
//             {error && (
//                <div className='text-white '>
//                {error}
//                </div>
//             )}
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;
