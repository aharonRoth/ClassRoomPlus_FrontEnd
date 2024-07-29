import React, { useState, useEffect } from 'react';
import CoursesList from '../courses-list/coursesList';
import axios from 'axios';
import Update from '../upDate/upDate';
import Delete from '../delete/delete';

const Subjects = ({ courses, setCourses, categories, show, showButton, theButton }) => {
    console.log(showButton);
    const [userCourses, setUserCourses] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    // Fetch user courses from localStorage on component mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.courses) {
            setUserCourses(user.courses);
        }
    }, []);

    // Handle category selection
    const handleSelect = async (event) => {
        const { value } = event.target;
        try {
            let url = 'http://localhost:3000/courses/';
            if(value == 'All'){
                setCourses(categories)
                return
            }
            if (value !== 'All') {
                url += `${value}`;
            }
            const { data } = await axios.get(url, { withCredentials: true });
            console.log(data.course);

            // Filter courses based on user's subscribed courses
            // const filteredCourses = data.course.filter(course => course.includes(course._id));
            // const filteredCourses = data.course.filter(course => course._id === value);
            let coursesArray = Array.isArray(data.course) ? data.course : [data.course];
            const filteredCourses = coursesArray.filter(course => course._id === value);
                setCourses(filteredCourses);
      
            }
         catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    // Check if categories is defined
    useEffect(() => {
        if (categories) {
            setLoading(false);
        }
    }, [categories]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state if categories are not yet loaded
    }

    return (
        <>
        {show&& (
            <div className='d-flex mb-3'>
                <div className='mr-5'>
                    Choose a topic
                </div>
                <div className='mr-7'>
                    <select onChange={handleSelect}>
                        <option value="All">All</option>
                        {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.courseName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <Update categories={categories} />
                </div>
                <div>
                    <Delete categories={categories} />
                </div>
            </div>
            )}
            <div>
                <CoursesList show={show} courses={courses} showButton={showButton} theButton={theButton} />
            </div>
        </>
    );
};

export default Subjects;
