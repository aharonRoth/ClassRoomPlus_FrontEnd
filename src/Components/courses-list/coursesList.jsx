import React from 'react';
import CourseItem from "../course-item/courseItem";

const CoursesList = ({ courses, show }) => {
  return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-md-2  g-4">
        {courses.map((course) => {
          const openDate = new Date(course.openDate);
          const endDate = new Date(course.endDate);
          return (
            <div className="col" key={course._id}>
              <CourseItem
                openDate={openDate.toISOString().split('T')[0]}
                endDate={endDate.toISOString().split('T')[0]}
                courseimg={course.courseimg}
                id={course.userId}
                courseName={course.courseName}
                description={course.description}
                price={course.price}
                userId={course.userId}
                courseId={course._id}
                subscription={course.subscription}
                show={show}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesList;