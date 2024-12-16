import React, { useState, useEffect } from 'react';
import './Explore.css'; 
import MonthlyHappenings from './MonthlyHappenings';
import FilterPanel from './FilterPanel';
import HeroSection from "../component/HeroSection";
import TopTrending from '../component/TopTrending';
import EventsUnder30 from '../component/EventsUnder30';
import FilteredEvents from '../component/FilteredEvents';

const SearchBar = ({ onFilterClick, showFilterPanel, onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('New York'); 

    const handleSearchChange = (e) => {
        setSearchText(e.target.value); 
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const passQuery = () => {
        onSearch(searchText);  // Pass the search query to the parent
    };

    return (
        <section className="search-bar">
            <input 
                type="text" 
                placeholder="Search events"
                value={searchText}
                onChange={handleSearchChange} 
            />
            <button onClick={onFilterClick}>Filter</button>
            <select onChange={handleLocationChange} value={selectedLocation}>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
            </select>
            <button className="search-btn" onClick={passQuery}>🔍</button>

            {showFilterPanel && <FilterPanel />}
        </section>
    );
};

const Explore = () => {
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    const toggleFilterPanel = () => {
        setShowFilterPanel(!showFilterPanel);
    };

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);  
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
            <SearchBar 
                onFilterClick={toggleFilterPanel} 
                showFilterPanel={showFilterPanel}
                onSearch={handleSearch}  
            />
            <MonthlyHappenings userLocation={userLocation}/>
            <FilteredEvents query={query} />
            <TopTrending userLocation={userLocation} />
            <EventsUnder30 userLocation={userLocation} />
        </div>
    );
};

export default Explore;
