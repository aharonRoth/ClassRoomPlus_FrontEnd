import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';


const AboutSection = ({ courses }) => {
  const { courseId } = useParams();
  const isCoursePage = !!courseId;
  const course = isCoursePage ? courses.find(c => c._id === courseId) : null;

  const title = isCoursePage ? course?.title : "About ClassRoom+";
  const description = isCoursePage ? course?.description : "ClassRoom+ is an innovative online platform that empowers both students and teachers to engage in open learning experiences. Our mission is to create a space where knowledge flows freely and everyone has the opportunity to both teach and learn.";

  const features = isCoursePage ? [] : [
    "Open course creation: Anyone can create and offer a course on any topic they're passionate about.",
    "Flexible enrollment: Students can join courses that interest them, regardless of traditional academic boundaries.",
    "Peer-to-peer learning: Foster a community where the roles of teacher and student are interchangeable."
  ];

  return (
  <div id='aboutbody'>
<Header showLinks={false} showPartLinks={true} /> 
     
    <div className="container py-5">
      <div className="bg-white p-5 rounded shadow">
        <h1 className="border-bottom border-primary pb-3 mb-4">{title}</h1>
        
        <p className="lead">
          {description}
        </p>
       
        {!isCoursePage && (
          <>
            <h2 className="text-primary mt-4 mb-3">Key Features:</h2>
            <ul className="list-unstyled">
              {features.map((feature, index) => (
                <li key={index} className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  {feature}
                </li>
              ))}
            </ul>

            <p className="mt-4">
              At ClassRoom+, we believe that everyone has something valuable to teach and something new to learn. Our platform breaks down traditional educational hierarchies, allowing knowledge to be shared in a more democratic and accessible way.
            </p>
          </>
        )}

        <div className="text-center mt-5">
          <a href="" className="btn btn-primary btn-lg">
            {isCoursePage ? "Enroll Now" : "Join ClassRoom+ Today!"}
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutSection;