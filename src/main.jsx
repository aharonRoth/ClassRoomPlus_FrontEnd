import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LogIn from './pages/LogIn/LogIn';
import App from './App.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ContentsClass from './pages/contents-class/contentsClass.jsx';
import Home from './pages/home/Home.jsx';
import Verifi from './pages/approve/Verifi.jsx';
import Signup from './pages/signup/Signup.jsx'
import About from './Components/header/AboutSection.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LogIn />
    },
    {
        path: 'signup',
        element: <Signup />
    },
    {
        path: 'dashboard',
        element: <Home />,
    },
    {
        path: 'about',
        element: <About />
    },
    {
        path: 'courses/:courseId',
        element: <About />
    },
    {
        path: 'contentsClass',
        element: <ContentsClass />
    },
    {
        path: 'app',
        element: <App />
    },
    {
        path: 'verifi',
        element: <Verifi />
    },
    {
        path: 'About',
        element: <Navigate to="/dashboard/about" replace />
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)