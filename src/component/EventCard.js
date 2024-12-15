import React from "react";
import "../pages/Explore.css";
import "../tailwind.css";


const EventCard = ({ title, time, location, price, followers, imgSrc }) => (
  <div className="card1">
    <img src={imgSrc} alt={title} />
    <div className="content">
      <h3>{title}</h3>
      <p>{time}</p>
      <p>{location}</p>
      <p>From ${price}</p>
      <p>{followers} followers</p>
    </div>
  </div>
);

export default EventCard;
