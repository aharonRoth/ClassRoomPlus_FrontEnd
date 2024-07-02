import React, { useEffect, useState } from 'react';
import './contentsClassPeople.css';
import axios from 'axios';

const ContentsClassPeople = ({friends }) => {
  console.log('Friends:', friends);
  const [error, setError] = useState(null);
  const [subscribed, setSubscribed] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`http://localhost:3000/courses/${courseId}`, { withCredentials: true });

  //       const theCourseSubscriptions = data.courses.subscription;

        const filtered = theCourseSubscriptions.map(subscription => subscription.userId);

  //       setSubscribed(filtered);
  //     } catch (error) {
  //       setError('There is an error');
  //     }
  //   };

  //   fetchData();
  // }, [courseId]);

  return (
    <div>
      <h2>Users List</h2>
      {error && <p>{error}</p>}
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend.userId}</li>
        ))}
      </ul>
    </div>
  );
}


export default ContentsClassPeople;





