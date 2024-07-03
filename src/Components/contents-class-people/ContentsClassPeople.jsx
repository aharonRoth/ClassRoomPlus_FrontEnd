import React, { useEffect, useState } from 'react';
import './contentsClassPeople.css';
import axios from 'axios';

const ContentsClassPeople = ({friends }) => {
  console.log('Friends:', friends);
  const [error, setError] = useState(null);
  const [subscribed, setSubscribed] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="contents-class-people">
      <h1>Friends</h1>
      <div className="contents-class-people__container">
        {friends.map(friend => (
          <div key={friend._id} className="contents-class-people__card">
            <h2>{friend.role}</h2>
            <h2>{friend.userId.firstName}</h2>
            <h3>{friend.userId.lastName}</h3>
          
          </div>
        ))}
      </div>
    </div>
  );

};


export default ContentsClassPeople;





