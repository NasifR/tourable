import React from "react";
import "../pages/Explore.css";
import "../tailwind.css";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons

const EventCard = ({ title, time, location, price, followers, imgSrc, onFavoriteClick, isFavorite }) => (
  <div className="card1">
    <img src={imgSrc} alt={title} />
    <div className="content">
      <h3>{title}</h3>
      <p>{time}</p>
      <p>{location}</p>
      <p>From ${price}</p>
      <p>{followers} followers</p>
    </div>
    <div className="favorite-icon">
      {isFavorite ? (
        <FaHeart onClick={onFavoriteClick} className="heart-icon filled" />
      ) : (
        <FaRegHeart onClick={onFavoriteClick} className="heart-icon" />
      )}
    </div>
  </div>
);

export default EventCard;
