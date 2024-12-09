import React, { useState, useEffect } from 'react';
import './Explore.css'; // Import your CSS file
import MonthlyHappenings from './MonthlyHappenings';
import FilterPanel from './FilterPanel';
import HeroSection from "../component/HeroSection";
import TopTrending from '../component/TopTrending';
import EventsUnder30 from '../component/EventsUnder30';



// Search Bar Component
const SearchBar = ({ onFilterClick, showFilterPanel }) => (
    <section className="search-bar">
        <input type="text" placeholder="Search events" />
        <button onClick={onFilterClick}>Filter</button>
        <select>    
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
        </select>
        <button className="search-btn">🔍</button>

        {/*Rendering the FilterPanel under the button for filter if showFilterPanel is true */}
        {showFilterPanel && <FilterPanel />}
    </section>
);
/*
// Event Card Component
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
*/

// Top Trending Section
/*
const TopTrending = () => (
    <section className="top-trending">
        <h2 className="section-title">Top trending in New York</h2>
        <div className="cards">
            <EventCard
                title="Harry Styles Concert"
                time="Tomorrow 9:00 PM"
                location="Madison Square Garden"
                price="169.00"
                followers="260"
                imgSrc="concert.jpg" // Replace with your image source
            />
            <EventCard
                title="Harry Styles Concert"
                time="Tomorrow 9:00 PM"
                location="Madison Square Garden"
                price="169.00"
                followers="260"
                imgSrc="concert.jpg" // Replace with your image source
            />
            <EventCard
                title="Harry Styles Concert"
                time="Tomorrow 9:00 PM"
                location="Madison Square Garden"
                price="169.00"
                followers="260"
                imgSrc="concert.jpg" // Replace with your image source
            />
            
        </div>
    </section>
);*/




/*
const EventsInNewYork = () => (
    <section className="events-in-ny">
        <h2 className="section-title">Events in New York</h2>
        <div className="cards">
            
            
            
        </div>
    </section>
);
*/


// Main Explore Page Component
const Explore = () => {
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);

    const toggleFilterPanel = () => {
        setShowFilterPanel(!showFilterPanel);
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation(`${latitude},${longitude}`);
            },
            (err) => {
              console.error("Error retrieving location:", err.message);
              setError("Unable to retrieve your location.");
            }
          );
        } else {
          setError("Geolocation is not supported by your browser.");
        }
      }, []);

    return (
    <div>
        <HeroSection />
        <SearchBar onFilterClick={toggleFilterPanel} showFilterPanel={showFilterPanel}/>
        <MonthlyHappenings userLocation={userLocation}/>
        <TopTrending userLocation={userLocation} />
      <EventsUnder30 userLocation={userLocation} />
    </div>
    );
};

export default Explore;
