import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
import LogIn from './pages/LogIn/LogIn';
import App from './App.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ContentsClass from './pages/contents-class/contentsClass.jsx';
import Home from './pages/home/Home.jsx';
import Verifi from './pages/approve/Verifi.jsx';
import Signup from './pages/signup/Signup.jsx'


const router = createBrowserRouter([
    {
        // if theres a token, go to dashboard
        path: '/',
        element: <LogIn />
    },
    {
        path: 'signup',
        element: <Signup />
    },
    {
        path: 'dashboard',
        element: <Home />
    },
    {
        path: '/App',
        element: <App />
    },

    // {
    //     path: 'addCourse',
    //     element: <AddCourse/>
    // },
    {
        path: 'contentsClass',
        element: <ContentsClass />
    },
    {
        path: 'verifi',
        element: <Verifi />
    }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
