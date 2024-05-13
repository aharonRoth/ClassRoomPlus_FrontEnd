import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    const [name, setName] = useState()
    const  navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.removeItem('userInfo')
        navigate('/')
    }
    useEffect(() =>{
        if (!localStorage.getItem('userInfo')){
            navigate('/')
            return
        }
        const {data, token} =JSON.parse(localStorage.getItem('userInfo'))
        if (!token){
            navigate('/')
        }
        setName(`${data.user.firstName} ${data.user.lastName}`)
    }, [])
    const handleToContinue = (e) =>{
        e.preventDefault();
        navigate('/App')
    }

    return (
      <>
  
        <div className='maincontainer2'>
      <div className="dashboard-container">
          <div className="dashboard-title">Welcome {name}</div>
          <button className="dashboard-button" onClick={handleToContinue}>
              To continue
          </button>
          <button className="dashboard-button" onClick={handleLogout}>
              Logout
          </button>
      </div>
      </div>
      </>
     
  );
};    


export default Dashboard