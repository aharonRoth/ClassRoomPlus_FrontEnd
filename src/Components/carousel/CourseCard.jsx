import React from 'react';
import CourseItem from "../course-item/courseItem";

const CourseCard = ({ course }) => {
  console.log(course.courseimg)
  return (
    <div className="col-md-4">
      <CourseItem
        id={course.userId}
        courseId={course._id}
        courseName={course.courseName}
        description={course.description}
        courseimg={course.courseimg}
        price={course.price}
      />
    </div>
  );
};

export default CourseCard;
