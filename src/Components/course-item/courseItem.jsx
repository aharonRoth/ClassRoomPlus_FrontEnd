import React, { useState } from "react";
import './courseItem.css';
import { useNavigate } from "react-router-dom";
import Subscription from "../subscribe/subscribe";
import DeleteSubscription from "../DeleteSubscription/DeleteSubscription";

const CourseItem = ({ openDate, endDate, id, courseName, description, price, userId,courseId }) => {
  const [subscribe, setSubscribe] = useState(false);
  console.log(  id,courseId,userId);

  const [Deltesubscribe, setDeleteSubscribe] = useState(false);
  const [showSubscription, setShowSubscription] = useState();
  const [showDeleteSubscription, setDeleteShowSubscription] = useState();
  const navigate = useNavigate();

  const handleButton = () => {
    console.log({ openDate, endDate, courseId, courseName, description, price });
    navigate('/contentsClass', { state: { openDate, endDate, courseId, courseName, description, price } });
  };

  const handleSubscribe = () => {
    setSubscribe(true);
    setShowSubscription(true);
  };

  const handleDeleteSubscribe = () => {
    setDeleteSubscribe(true);
    setDeleteShowSubscription(true);
  };

  const userInfo = localStorage.getItem('userInfo');
  const { data } = JSON.parse(userInfo);


  return (
    <>
      <div className="card">
        <div id="courseName">{courseName}</div>
        <div className="pCI">{description}</div>
        <div className="d-flex">
          <label htmlFor="openDate">Open date: <span id="opendate">{openDate}</span></label>
        </div>
        <div className="d-flex gap-1">
          <div id="b">End date:</div>
          <div id="endDate">{endDate}</div>
        </div>
        <div className="d-flex">
          <label htmlFor="price">Price: <span className="pCI">{price}</span></label>
        </div>
        <div className="d-flex">
          <button className="button" id={id} onClick={handleButton}>Enter Course</button>
          <div className="d-flex flex-column">
            <button className="button2" id={id} onClick={handleSubscribe}>Subscribe</button>
            <button className="button3" id={id} onClick={handleDeleteSubscribe}>Unsubscribe</button>
          </div>
        </div>
        {subscribe && (
          <Subscription
            user={data}
            courseId={courseId}
            showSubscription={showSubscription}
            setShowSubscription={setShowSubscription}
          />
        )}
        {Deltesubscribe && (
          <DeleteSubscription
            user={data}
            courseId={courseId}
            showDeleteSubscription={showDeleteSubscription}
            setDeleteShowSubscription={setDeleteShowSubscription}
          />
        )}
      </div>
    </>
  );
};

export default CourseItem;
