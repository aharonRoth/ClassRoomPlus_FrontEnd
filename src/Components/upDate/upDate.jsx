import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './update.css';

const Update = ({ categories }) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [courseData, setCourseData] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState("All");
    const [showErrror, setShowError] = useState(false);
 
    const userInfo = localStorage.getItem('userInfo');
    const {data} = JSON.parse(userInfo)


    const handleSelect = async (event) => {
        const { value } = event.target;
        console.log(value);
        setSelectedCategoryId(value);
        const selectedCategory = categories.find(category => category._id === value);
        const selectedCategoryByUserId = selectedCategory.userId;
        if(selectedCategoryByUserId !== data.user._id){
            setShowError(true)
            return
        }
        console.log(selectedCategoryId);
        if (selectedCategory) {
            setCourseData({
                courseName: selectedCategory.courseName,
                openDate: new Date(selectedCategory.openDate).toISOString().split('T')[0],
                endDate: new Date(selectedCategory.endDate).toISOString().split('T')[0],
                description: selectedCategory.description,
                price: selectedCategory.price,
                courseId: value,
                
            });
            
        }
        // try {
        //     await axios.put(`http://localhost:3000/courses/${courseData.courseId}`, { withCredentials: true });
            setOpenUpdate(true);
        // } catch (error) {
        //     setShowError(true)
        // }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(selectedCategoryId);
            await axios.put(`http://localhost:3000/courses/${courseData.courseId}`, courseData, { withCredentials: true });
            window.location.reload()
        } catch (error) {
            console.error('Error updating course:', error);
        }
        setSelectedCategoryId("All");
        setOpenUpdate(false);
    }
        const onClose = () => {
            setOpenUpdate(false);
            setSelectedCategoryId("All");
        };
        const handleBotton = () =>{
            setShowError(false)
            setSelectedCategoryId("All")   
        }
   
        return (
            <>
                <div className='d-flex '>
                    <div className='mr-5'>
                        To update
                    </div>
                    <div className='mr-3'>
                        <select value={selectedCategoryId} onChange={handleSelect}>
                            <option value="All">Choose</option>
                            {categories?.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.courseName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {openUpdate && (
                    <div className="add-course-modal ">
                        <button className="close-button" onClick={onClose}>X</button>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Course Name:</label>
                                <input type="text" name="courseName" value={courseData.courseName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Open Date:</label>
                                <input type="date" name="openDate" value={courseData.openDate} onChange={handleChange} />
                            </div>
                            <div>
                                <label>End Date:</label>
                                <input type="date" name="endDate" value={courseData.endDate} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Description:</label>
                                <textarea name="description" value={courseData.description} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Price:</label>
                                <input type="number" name="price" value={courseData.price} onChange={handleChange} />
                            </div>
                            <button type="submit" id='CreateCourse'>Update Course</button>
                        </form>
                    </div>
                )}
                {showErrror && (
                    <div className="confirm-modal">
                        <p>Sorry but you do not have permission</p>
                        <div className="buttons">
                            <button className="confirm" onClick={handleBotton}>ok</button>
                        </div>
                    </div>
                )}
            </>
        );
    };

    export default Update;
