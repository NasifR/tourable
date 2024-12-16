import { useEffect, useState } from "react";
import React from "react";
import EventCard from "./EventCard";
import "../pages/Explore.css";

const apikey = process.env.REACT_APP_API_KEY;

const CategoryEvents = ({ userLocation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Arts & Theatre"); // Default category

  const categories = ["Arts & Theatre", "Comedy", "Family", "Music"];

  useEffect(() => {
    if (!userLocation || !selectedCategory) return;

    const fetchEventsByCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${userLocation}&radius=100&size=10&classificationName=${selectedCategory}&apikey=${apikey}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch events for ${selectedCategory}.`);
        }

        const data = await response.json();

        if (data._embedded?.events) {
          const categoryEvents = data._embedded.events.slice(0, 5).map((event) => ({
            title: event.name,
            time: event.dates.start.localDate || "No Date",
            location: event._embedded.venues?.[0]?.name || "Unknown Location",
            price: event.priceRanges?.[0]?.min || "N/A",
            followers: event._embedded.attractions?.[0]?.upcomingEvents?._total || "N/A",
            imgSrc: event.images?.[0]?.url || "../logo/gg_profile.png",
            eventId: event.id,
          }));
          setEvents(categoryEvents);
        } else {
          setEvents([]); // No events found
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventsByCategory();
  }, [userLocation, selectedCategory]); // Refetch when category changes

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleRefetch = () => {
    setEvents([]);
    setError(null);
  };

  return (
    <section className="top-trending">
      <h2 className="section-title">Category Events</h2>

      {/* Dropdown to select category */}
      <div className="dropdown-container">
        <label htmlFor="category-select">Choose a category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && events.length === 0 && <p>No events found for this category near you.</p>}

      <div className="cards">
        {events.map((event) => (
          <EventCard
            key={event.eventId}
            title={event.title}
            time={event.time}
            location={event.location}
            price={event.price}
            followers={event.followers}
            imgSrc={event.imgSrc}
          />
        ))}
      </div>

      <button onClick={handleRefetch}>Refresh</button>
    </section>
  );
};

export default CategoryEvents;
