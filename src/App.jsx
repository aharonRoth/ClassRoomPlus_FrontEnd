import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import AddCourse from './Components/course-item/add-course/addCourse';
import UtilsCheckUserAndToken from './utils/utilsCheckUserAndToken';
import Subjects from './Components/subjects/subjects';
import Chatbot from './Components/chatbot/chatbot';
import CourseItem from './Components/course-item/courseItem';
import Subscription from './Components/subscribe/subscribe';
import Header from './Components/header/Header'
import { Link } from 'react-router-dom'

function App() {
  const [addCourse, setAddCourse] = useState(false);
  const [coursesArr, setCoursesArr] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [show, setShow] = useState(false);

  const checkUserAndToken = UtilsCheckUserAndToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses/byUser', { withCredentials: true });
        const { data } = response;
        
        if (!data || data.userscourses.length === 0) {
          setIsSubscribed(false);
        } else {
          setCategories(data.userscourses);
          setCoursesArr(data.userscourses);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchError(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = checkUserAndToken();
    if (data) {
      setUserId(`${data.user._id}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  const handleButton = () => {
    setAddCourse(!addCourse);
  };

  const handleClose = () => {
    setAddCourse(false);
  };

  const handleNavigateToCourse = (courseId) => {
    const course = coursesArr.find(c => c._id === courseId);
    setSelectedCourse(course);
  };

  if (fetchError) {
    return <div>Failed to fetch data. Please try again later.</div>;
  }

  return (
    <>
      <div>
        <Header showLinks={true} showPartLinks={false} showAdminLinks={false} />
        <Chatbot />
        {addCourse && <AddCourse handleClose={handleClose} userId={userId} />}
        <button className="btn btn-primary" onClick={handleButton}>Add Course</button>
        {isSubscribed ? (
          selectedCourse ? (
            <>
              <CourseItem
                openDate={selectedCourse.openDate}
                endDate={selectedCourse.endDate}
                id={selectedCourse.userId}
                courseName={selectedCourse.courseName}
                description={selectedCourse.description}
                price={selectedCourse.price}
                userId={selectedCourse.userId}
                courseId={selectedCourse._id}
                courseimg={selectedCourse.courseimg}
              />
              <Subscription courseId={selectedCourse._id} userId={userId} />
            </>
          ) : (
            <Subjects
              show={show}
              courses={coursesArr}
              setCourses={setCoursesArr}
              categories={categories}
            />
          )
        ) : (
          <div>You are not subscribed to any courses.</div>
        )}
      </div>
    </>
  );
}

export default App;
