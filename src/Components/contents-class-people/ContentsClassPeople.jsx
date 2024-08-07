import React, { useEffect, useState } from 'react';
import './contentsClassPeople.css';
import axios from 'axios';

const ContentsClassPeople = ({ courseId }) => {
  const [error, setError] = useState(null);
  const [subscribed, setSubscribed] = useState([]);
  const [theCourseTeacher, setTheCourseTeacher] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/courses/${courseId}`, { withCredentials: true });
        console.log('Response data:', data);

        if (data.course && data.course.userId) {
          const TeacherId = data.course.userId;
          console.log(TeacherId);
          setTheCourseTeacher(TeacherId);
        } else {
          throw new Error('Teacher ID not found in the response');
        }

        if (data.courses && data.courses.subscription) {
          const theCourseSubscriptions = data.courses.subscription;
          const filtered = theCourseSubscriptions.map(subscription => subscription.userId);
          setSubscribed(filtered);
        } else {
          throw new Error('Subscriptions not found in the response');
        }

        setLoading(false); 

      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('There is an error');
        setLoading(false); 
      }
    };

    fetchData();
  }, [courseId]);

  console.log('theCourseTeacher state:', theCourseTeacher);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <h2> Teachers </h2>
      {theCourseTeacher ? (
        <div> {theCourseTeacher.firstName} {theCourseTeacher.lastName} </div>
      ) : (
        <p>Loading...</p>
      )}
      <h2>Users List</h2>
      <ul>
        {subscribed.length > 0 ? (
          subscribed.map((user, index) => (
            <li key={index}>
              {user ? `${user.firstName} ${user.lastName}` : 'No ID available'}
            </li>
          ))
        ) : (
          <p>No users subscribed.</p>
        )}
      </ul>
        {error && <p>{error}</p>}
    </div>
  );
};

export default ContentsClassPeople;











