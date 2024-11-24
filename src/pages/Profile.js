import React from "react";
import profile_cover from "../assets/images/profile_cover.png";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import './Profile.css';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";

// card format
const EventCard = ({ title, time, location, price, followers, imgSrc }) => (
  <div className="card1">
      <img src={imgSrc} alt="Event" />
      <div className="content">
          <h3>{title}</h3>
          <p>{time}</p>
          <p>{location}</p>
          <p>From ${price}</p>
          <p>{title} | 👥 {followers} followers</p>
      </div>
  </div>
);

// Place holder cards for favorited events
const FavoriteEvents = () => (
  <section className="top-trending">
      <h2 className="section-title">Favorite Events</h2>
      <div className="cards">
          <EventCard
              title="Harry Styles Concert"
              time="Tomorrow 9:00 PM"
              location="Madison Square Garden"
              price="169.00"
              followers="260"
              imgSrc="concert.jpg" e
          />
          <EventCard
              title="Harry Styles Concert"
              time="Tomorrow 9:00 PM"
              location="Madison Square Garden"
              price="169.00"
              followers="260"
              imgSrc="concert.jpg" 
          />
          <EventCard
              title="Harry Styles Concert"
              time="Tomorrow 9:00 PM"
              location="Madison Square Garden"
              price="169.00"
              followers="260"
              imgSrc="concert.jpg" 
          />
          
      </div>
  </section>
);

function Profile({ signOut, user }) {
  return (
    <div className="bg-white">
      <div className="pt-20" style={{ backgroundColor: "#452A1A" }}>
        <img src={profile_cover} alt="cover" className="w-full" />
      </div>

      <div
        className="pl-[32%] text-white"
        style={{ backgroundColor: "#452A1A" }}
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl pt-10 mb-2">Name</h1>
          <h2 className="text-lg mb-3">Location</h2>
          <p>Profile description</p>
         
          
          <div className="flex space-x-4 mt-4 pb-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-2xl hover:text-gray-300" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-white text-2xl hover:text-gray-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-2xl hover:text-gray-300" />
            </a>
          </div>
          <button onClick={signOut} className="py-2 px-4 mb-5 bg-white text-black font-bold rounded-full">Log out</button>
        </div>
      </div>

      <div>
        <FavoriteEvents />
      </div>
    </div>
  );
}

export default withAuthenticator(Profile);
