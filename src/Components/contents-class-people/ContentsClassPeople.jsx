import React, { useEffect, useState } from 'react';
import './contentsClassPeople.css';
import axios from 'axios';

const ContentsClassPeople = ({ courseId }) => {
  const [error, setError] = useState(null);
  const [subscribed, setSubscribed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/courses/${courseId}`, { withCredentials: true });

        const theCourseSubscriptions = data.courses.subscription;

        const filtered = theCourseSubscriptions.map(subscription => subscription.userId);
        console.log('Filtered User IDs:', filtered);

        setSubscribed(filtered);
      } catch (error) {
        setError('There is an error');
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div>
      <h2>Users List</h2>
      {error && <p>{error}</p>}
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
    </div>
  );
};

export default ContentsClassPeople;





