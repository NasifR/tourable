//Filter Component
import React, {useState} from 'react';
import './FilterPanel.css';

const FilterPanel = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [locations, setLocations] = useState({
        Manhattan: false,
        Brooklyn: false,
        Queens: false,
        Bronx: false,
        StatenIsland: false,
    });

    const handleStartDateChange = (event) => setStartDate(event.target.value);
    const handleEndDateChange = (event) => setEndDate(event.target.value);

    const handleCheckboxChange = (stateSetter, key) => (event) => {
        stateSetter((prev) => ({ ...prev, [key]: event.target.checked }));
    };

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

    const [eventDuration, setEventDuration] = useState({
        OneDay: false,
        MultiDay: false,
        AllDay: false,
        Evening: false,
        Morning: false,
    });
    const [accessibility, setAccessibility] = useState({
        Wheelchair: false,
        PublicTransport: false,
        Parking: false,
    });
    const [audienceType, setAudienceType] = useState({
        FamilyFriendly: false,
        AdultsOnly: false,
        AllAges: false,
    });
    const [indoorOutdoor, setIndoorOutdoor] = useState({
        Indoor: false,
        Outdoor: false,
    });
    const [eventSize, setEventSize] = useState({
        Small: false,
        Medium: false,
        Large: false,
    });
    const [language, setLanguage] = useState("English");

    return (
        <div className="filter-panel">
                    {/*Filter Options*/}
                    {/*Date filter*/}
                    <div className="filter-section">
                        <label>Date</label>
                        <div className='date-range'>
                        <input 
                        type='date'
                        />
                        <span className='date-separation'>-</span>
                        <input
                        type='date'
                        />
                    </div>
                    </div>

                    {/*Time filter*/}
                    <div className="filter-section">
                        <label>Time (EST)</label>
                        <div className='date-range'>
                        <input 
                        type='time'
                        />
                        <span className='date-separation'>-</span>
                        <input
                        type='time'
                        />
                    </div>
                </div>

                    {/*Location filter*/}
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
                            {/* Converts camelCase to readable format */}
                            <label htmlFor={location}>{location.replace(/([A-Z])/g, ' $1')}</label>
                        </div>
                    ))}
                    </div>
                    {/*Event Type filter*/}
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

                {/*Price Range filter*/}
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
                                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })} />

                </div>
                </div>

                {/*Event Duration*/}
                <div className="filter-section">
                        <label>Event Duration</label>
                        <div className="duration-checkboxes">
                    {Object.keys(eventDuration).map((duration) => (
                        <div key={duration} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={duration}
                                name={duration}
                                checked={eventDuration[duration]}
                                onChange={handleCheckboxChange(setEventDuration, duration)}
                            />
                            <label htmlFor={duration}>{duration.replace(/([A-Z])/g, ' $1')}</label>
                        </div>
                    ))}
                </div>
                </div>
                
                {/*Accessibility filter*/}
                <div className="filter-section">
                        <label>Accessibility</label>
                        <div className="accessibility-checkboxes">
                    {Object.keys(accessibility).map((access) => (
                        <div key={access} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={access}
                                name={access}
                                checked={eventTypes[access]}
                                onChange={handleCheckboxChange(setAccessibility, access)}
                            />
                            <label htmlFor={access}>{access.replace(/([A-Z])/g, ' $1')}</label>
                        </div>
                    ))}
                </div>
                </div>

                {/*Audience Type filter*/}
                <div className="filter-section">
                        <label>Audience Type</label>
                        <div className="audience-checkboxes">
                    {Object.keys(audienceType).map((audience) => (
                        <div key={audience} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={audience}
                                name={audience}
                                checked={audienceType[audience]}
                                onChange={handleCheckboxChange(setAudienceType, audience)}
                            />
                            <label htmlFor={audience}>{audience.replace(/([A-Z])/g, ' $1')}</label>
                        </div>
                    ))}
                </div>
                </div>

                {/*Indoor/Outdoor filter*/}
                <div className="filter-section">
                        <label>Indoor/Outdoor</label>
                        <div className="indoor-outdoor-checkboxes">
                    {Object.keys(indoorOutdoor).map((io) => (
                        <div key={io} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={io}
                                name={io}
                                checked={indoorOutdoor[io]}
                                onChange={handleCheckboxChange(setIndoorOutdoor, io)}
                            />
                            <label htmlFor={io}>{io.replace(/([A-Z])/g, ' $1')}</label>
                        </div>
                    ))}
                </div>
                </div>

                {/*Event Size filter*/}
                <div className="filter-section">
                        <label>Event Size</label>
                        <div className="event-size-checkboxes">
                    {Object.keys(eventSize).map((size) => (
                        <div key={size} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={size}
                                name={size}
                                checked={eventSize[size]}
                                onChange={handleCheckboxChange(setEventSize, size)}
                            />
                            <label htmlFor={size}>{size}</label>
                        </div>
                    ))}
                </div>
                </div>

                {/*Languages filter*/}
                <div className="filter-section">
                        <label>Languages</label>
                        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                </select>
                </div>
                </div>


            </div>      
    );
};
export default FilterPanel;