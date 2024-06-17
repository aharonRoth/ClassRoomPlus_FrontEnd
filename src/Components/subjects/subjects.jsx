import React, { useState, useEffect } from 'react';
import CoursesList from '../courses-list/coursesList';
import axios from 'axios';
import Update from '../upDate/upDate';
import Delete from '../delete/delete';

const Subjects = ({ courses, setCourses, categories }) => {
    const [userCourses, setUserCourses] = useState([]);

    // Fetch user courses from localStorage on component mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.courses) {
            setUserCourses(user.courses);
        }
    }, []);

    const handleSelect = async (event) => {
        const { value } = event.target;
        try {
            let url = 'http://localhost:3000/courses/';
            if (value !== 'All') {
                url += `${value}`;
            }
            const { data } = await axios.get(url, { withCredentials: true });

            // Filter courses based on user's subscribed courses
            const filteredCourses = data.courses.filter(course => userCourses.includes(course._id));

            setCourses(filteredCourses);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    return (
        <>
            <div className='d-flex mb-3'>
                <div className='mr-5'>
                    Choose a topic
                </div>
                <div className='mr-7'>
                    <select onChange={handleSelect}>
                        <option value="All">All</option>
                        {categories.map((category) => (
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
            <div>
                <CoursesList courses={courses} />
            </div>
        </>
    );
};

export default Subjects;
