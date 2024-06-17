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
  const checkUserAndToken = UtilsCheckUserAndToken();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/courses');
        setCoursesArr(data.courses);
        setCategories(data.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
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
        window.location.href = '/login';
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


  return (
    <>
      <div>
        <Header showLinks={true} />
        <Chatbot onNavigateToCourse={handleNavigateToCourse} />
        {selectedCourse ? (
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
            />
            <Subscription courseId={selectedCourse._id} userId={userId} />
          </>
        ) : (
          <Subjects
            courses={coursesArr}
            setCourses={setCoursesArr}
            categories={categories}
          />
        )}
      </div>
      <button id="AppButton" onClick={handleButton}>To add a new course</button>
      {addCourse && (
        <AddCourse onClose={handleClose} userId={userId} />
      )}
    </>
  );
}

export default App;
