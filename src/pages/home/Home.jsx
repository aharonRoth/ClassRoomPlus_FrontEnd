import HeroSection from './../../Components/hero-section/HeroSection.jsx'
import CoursesSection from './../../Components/courses-section/CoursesSection.jsx'
import axios from 'axios'
import { useState } from 'react'
// import TeachersSection from './../../Components/teachers-section/TeachersSection.jsx'
import Header from './../../Components/header/Header.jsx'
import Chatbot from './../../Components/chatbot/chatbot.jsx'
import Footer from './../../Components/footer/Footer.jsx'
import UtilsCheckUserAndToken from '../../utils/utilsCheckUserAndToken'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

import Subjects from '../../Components/subjects/subjects.jsx'


const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(true);

  const checkUserAndToken= UtilsCheckUserAndToken()
    useEffect(() => {
        checkUserAndToken()
      }, [])
      useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get('http://localhost:3000/courses');
            console.log(response);
            setCourses(response.data.courses);
            setCategories(response.data.courses)
            setLoading(false);
          } catch (err) {
            console.error('Error fetching courses:', err); // Added console log
            setError(err);
            setLoading(false);
          }
        };
    
        fetchCourses();
      }, []);
      
    return (
        <>
            <Chatbot />
            <Header showLinks={true} showPartLinks={false} showAdminLinks={false}/>
            <Outlet />
          
            <>
                <HeroSection />
            </>
            <>
                {/* <CoursesSection courses={courses} loading={loading} setLoading={setLoading} error={error}/> */}
            </>
            <Subjects 
             show={show}
             courses={courses}
             setCourses={setCourses}
             categories={categories}/>
            <Footer />
            <>
                {/* <TeachersSection/> */}
            </>
        </>
    )
}
export default Home