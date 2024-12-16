import React, { useState, useEffect } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ query, apikey }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [locations, setLocations] = useState({
        Manhattan: false,
        Brooklyn: false,
        Queens: false,
        Bronx: false,
        StatenIsland: false,
    });
    const [eventTypes, setEventTypes] = useState({
        Festivals: false,
        Sports: false,
        Concerts: false,
        Theater: false,
        ArtExhibits: false,
        Restaurants: false,
        Workshops: false,
        Nightlife: false,
        FundraisingCharity: false,
        Outdoor: false,
        Comedy: false,
        ConferencesNetworking: false,
    });
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

    const handleStartDateChange = (event) => setStartDate(event.target.value);
    const handleEndDateChange = (event) => setEndDate(event.target.value);

    const handleCheckboxChange = (stateSetter, key) => (event) => {
        stateSetter((prev) => ({ ...prev, [key]: event.target.checked }));
    };

    const buildApiQuery = () => {
        let queryParams = `keyword=${query}&apikey=${apikey}`;

        if (startDate) queryParams += `&startDateTime=${startDate}T00:00:00Z`;
        if (endDate) queryParams += `&endDateTime=${endDate}T23:59:59Z`;

        const selectedLocations = Object.keys(locations).filter(location => locations[location]);
        if (selectedLocations.length > 0) {
            queryParams += `&city=${selectedLocations.join(',')}`;
        }

        const selectedEventTypes = Object.keys(eventTypes).filter(type => eventTypes[type]);
        if (selectedEventTypes.length > 0) {
            queryParams += `&classificationName=${selectedEventTypes.join(',')}`;
        }

        if (priceRange.min && priceRange.max) {
            queryParams += `&priceRange=${priceRange.min}-${priceRange.max}`;
        }

        return queryParams;
    };

    const fetchFilteredEvents = async () => {
        const queryParams = buildApiQuery();
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${queryParams}`);
            const data = await response.json();
            if (data._embedded?.events) {
                console.log(data._embedded.events);
            } else {
                console.log("No events found.");
            }
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    useEffect(() => {
        if (query) {
            fetchFilteredEvents();
        }
    }, [query, startDate, endDate, locations, eventTypes, priceRange]);

    return (
        <div className="filter-panel">
            <div className="filter-section">
                <label>Date</label>
                <div className='date-range'>
                    <input
                        type='date'
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <span className='date-separation'>-</span>
                    <input
                        type='date'
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>

            <div className="filter-section">
                <label>Location</label>
                <div className="location-checkboxes">
                    {Object.keys(locations).map((location) => (
                        <div key={location} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={location}
                                name={location}
                                checked={locations[location]}
                                onChange={handleCheckboxChange(setLocations, location)}
                            />
                            <label htmlFor={location}>{location.replace(/([A-Z])/g, ' $1')}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <label>Event Type</label>
                <div className="event-type-checkboxes">
                    {Object.keys(eventTypes).map((type) => (
                        <div key={type} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={type}
                                name={type}
                                checked={eventTypes[type]}
                                onChange={handleCheckboxChange(setEventTypes, type)}
                            />
                            <label htmlFor={type}>{type.replace(/([A-Z])/g, ' $1')}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <label>Price Range ($)</label>
                <div className="price-range">
                    <input
                        type='number'
                        placeholder='Min Price'
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    />
                    <span className='price-separator'>-</span>
                    <input
                        type='number'
                        placeholder='Max Price'
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
