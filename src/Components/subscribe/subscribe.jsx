import React, { useEffect, useId, useState } from 'react';
import axios from 'axios';

const Subscription = ({  user,courseId, showSubscription, setShowSubscription }) => {
console.log (courseId)
  const [course, setCourse] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response  = await axios.get(`http://localhost:3000/courses/${courseId}`, { withCredentials: true });
        console.log(response.data.courses)
        setCourse(response.data.courses)
        setIsLoading(false)
        } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])
  console.log(course);
  // const theCourse = categories.find(category => category._id === courseId);

  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const handleSubscribe = async () => {
    // console.log(user.user._id)
    try {
      // console.log(user)
      const { data } = await axios.put(`http://localhost:3000/courses/subscribe/${courseId}`,
         { userId: user.user._id}, { withCredentials: true });
         
      
      const { status } = data;


      if (status === 'success') {
        setSubscriptionStatus('subscribed');
      } else {
        setError('Failed to subscribe to the course');
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data.message);
    }
    setShowSubscription(false)
  };
  const handleSubscribeNo = () => {
    setShowSubscription(false)
  }

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  // const userSubscription = course.subscription.find(sub => sub.user_id === user._id);

  // if (userSubscription && (userSubscription.role == 'teacher' || userSubscription.role == 'student')) {
  //   return (
  //     <div> You are already subscribed for the course</div>
  //   )
  // }

  return (
    <>
      <div>
        {subscriptionStatus === 'subscribed' ? (
          <p>You have successfully subscribed to this course!</p>
        ) : (
          null
        )}
        {error && <p>Error: {error}</p>}
      </div>
      <div>
        {showSubscription && (
          <div className="confirm-modal">
            <p>Are you sure that you want to subscribe?</p>
            <div className="buttons">
              <button className="confirm" onClick={handleSubscribe}>Yes</button>
              <button className="cancel" onClick={handleSubscribeNo}>No</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Subscription;
