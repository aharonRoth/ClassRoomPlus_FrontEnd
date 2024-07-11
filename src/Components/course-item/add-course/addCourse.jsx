import React, { useState } from 'react';
import axios from 'axios';
import './addCourse.css';
import UtilsCheckUserAndToken from '../../../utils/utilsCheckUserAndToken';
import CourseImageModal from './../../../../src/assets/courseImages/CourseImageModal';

const AddCourse = ({ onClose, userId }) => {
    const checkUserAndToken = UtilsCheckUserAndToken();
    console.log(userId);
    const [courseData, setCourseData] = useState({
        courseName: '',
        openDate: '',
        endDate: '',
        description: '',
        price: '',
        courseimg: '',
        userId: userId
    });

    const [showImageModal, setShowImageModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const courseImages = [
        'src/assets/courseImages/course1.jpg',
        'src/assets/courseImages/course2.jpg',
        'src/assets/courseImages/course3.jpg',
        'src/assets/courseImages/course4.jpg',
        'src/assets/courseImages/course5.jpg',
        // Add more course images as needed
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/courses', courseData, { withCredentials: true });
            console.log(response.data);
            setSuccess('Course created successfully!');
            setError('');
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error creating course:', error);
            setError('Error creating course. Please try again.');
            setSuccess('');
        }
    };

    const handleImageSelect = (selectedImage) => {
        setCourseData({ ...courseData, courseimg: selectedImage });
        setShowImageModal(false);
    };

    return (
        <div className="add-course-modal">
            <div className="add-course-container">
                <button className="close-button" onClick={onClose}>X</button>
                <form className="add-course-form" onSubmit={handleSubmit}>
                    <h2 className="add-course-title">Create a New Course</h2>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <label className="add-course-label">Course Name:</label>
                    <input className="add-course-input" type="text" name="courseName" value={courseData.courseName} onChange={handleChange} required />

                    <label className="add-course-label">Course Image:</label>
                    <div className="image-selection">
                        <button type="button" onClick={() => setShowImageModal(true)}>Choose Image</button>
                        {courseData.courseimg && <img src={courseData.courseimg} alt="Selected Course" className="selected-image" />}
                    </div>

                    <label className="add-course-label">Open Date:</label>
                    <input className="add-course-input" type="date" name="openDate" value={courseData.openDate} onChange={handleChange} required />

                    <label className="add-course-label">End Date:</label>
                    <input className="add-course-input" type="date" name="endDate" value={courseData.endDate} onChange={handleChange} required />

                    <label className="add-course-label">Description:</label>
                    <textarea className="add-course-input" name="description" value={courseData.description} onChange={handleChange} required></textarea>

                    <label className="add-course-label">Price:</label>
                    <input className="add-course-input" type="number" name="price" value={courseData.price} onChange={handleChange} required />

                    <button className="add-course-button" type="submit">Create Course</button>
                </form>
            </div>
            {showImageModal && <CourseImageModal courseImages={courseImages} onSelect={handleImageSelect} onClose={() => setShowImageModal(false)} />}
        </div>
    );
};

export default AddCourse;
