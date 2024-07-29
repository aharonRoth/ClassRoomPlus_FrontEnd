import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Subscription from "../subscribe/subscribe";
import DeleteSubscription from "../DeleteSubscription/DeleteSubscription";

const CourseItem = ({ openDate, endDate, id, courseName, description, price, userId, courseId, courseimg, subscription, show,  theButton,  showButton}) => {
  const [subscribe, setSubscribe] = useState(false);
  const [Deltesubscribe, setDeleteSubscribe] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showDeleteSubscription, setDeleteShowSubscription] = useState(false);
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/contentsClass', { state: { openDate, endDate, courseId, courseName, description, price, userId, courseimg, subscription } });
  };
  console.log(courseId);

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
  console.log(theButton);

  return (
    <div className="card h-100" style={{ overflow: 'hidden', backgroundImage: `url(${courseimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="card-body d-flex flex-column" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <div id="courseName" className="card-title">{courseName}</div>
        <div className="pCI card-text flex-grow-1" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{description}</div>
        <div className="d-flex justify-content-between mt-auto">
          <label htmlFor="openDate">Open date: <span id="opendate">{openDate}</span></label>
        </div>
        <div className="d-flex justify-content-between">
          <div id="b">End date:</div>
          <div id="endDate">{endDate}</div>
        </div>
        <div className="d-flex justify-content-between">
          <label htmlFor="price">Price: <span className="pCI">{price}</span></label>
        </div>
        {(showButton || theButton) &&(
        <div className="d-flex justify-content-between mt-auto">
          <button className="btn btn-primary" id={id} onClick={handleButton}>Enter Course</button>
          </div>
        )}
            {show &&(
          <div className="d-flex flex-column">
            <button className="btn btn-secondary mb-1" id={id} onClick={handleSubscribe}>Subscribe</button>
            <button className="btn btn-danger" id={id} onClick={handleDeleteSubscribe}>Unsubscribe</button>
          </div>
          )}
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
    </div>
  );
};

export default CourseItem;
