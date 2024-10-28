import React, { useState } from 'react';
import './Explore.css'; // Import your CSS file
import MonthlyHappenings from './MonthlyHappenings';
import FilterPanel from './FilterPanel';
import './FilterPanel.css';

// Hero Section Component
const HeroSection = () => (
    <section className="hero">
        <h1 className="f1">WHAT TYPE OF </h1>
        <h1 className="f1">EVENT ARE YOU </h1>
        <h1 className="f1">LOOKING FOR?</h1>
        <p>Find the best events near you, from food festivals to concerts, all in one place tailored to your interests.</p>
    </section>
);

// Search Bar Component
const SearchBar = ({ onFilterClick, showFilterPanel }) => (
    <section className="search-bar">
        <input type="text" placeholder="Search events" />
        <button onClick={onFilterClick}>Filter</button>
        <select>    
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
            {/* Add more cities as needed */}
        </select>
        <button className="search-btn">🔍</button>

        {/*Rendering the FilterPanel under the button for filter if showFilterPanel is true */}
        {showFilterPanel && <FilterPanel />}
    </section>
);

// Event Card Component
const EventCard = ({ title, time, location, price, followers, imgSrc }) => (
    <div className="card">
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


// Top Trending Section
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
            {/* Repeat <EventCard /> component for additional events */}
        </div>
    </section>
);

// Main Explore Page Component
const Explore = () => {
    const [showFilterPanel, setShowFilterPanel] = useState(false);

    const toggleFilterPanel = () => {
        setShowFilterPanel(!showFilterPanel);
    };
    return (
    <div>
        <HeroSection />
        <SearchBar onFilterClick={toggleFilterPanel} showFilterPanel={showFilterPanel}/>
        <MonthlyHappenings />
        <TopTrending />
    </div>
    );
};

export default Explore;
