// src/Components/course-card/CourseCard.jsx
import React from 'react';
import { useNavigate } from "react-router-dom"
const chektoseeifuserloggedin = (next) => {
   
  if (localStorage.getItem('userInfo')) {
    next();
  } else {
    alert("Please login to view the course");
  }
   
}

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
  return (
    <div  className="card">
      <img src={course.image} className="card-img-top" alt={course.title} />
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text">Price: ${course.price}</p>
        <button onClick={() => chektoseeifuserloggedin(() => navigate(`/contentsClass`,{ state: course}))} className="btn btn-primary">View Course</button>
       
       
      </div>
    </div>
  );
};

export default CourseCard;
