import { useEffect, useState } from "react";
import React from "react";
import EventCard from "./EventCard";

const apikey = process.env.REACT_APP_API_KEY;

const FilteredEvents = ({ query }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&apikey=${apikey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const data = await response.json();

        if (data._embedded?.events) {
          const trendingEvents = data._embedded.events.slice(0, 5).map((event) => ({
            title: event.name || "Untitled Event",
            time: event.dates.start.localDate || "No Date",
            location: event._embedded.venues?.[0]?.name || "Unknown Location",
            price: event.priceRanges?.[0]?.min ? `$${event.priceRanges[0].min}` : "N/A",
            followers: event._embedded.attractions?.[0]?.upcomingEvents?._total || "N/A",
            imgSrc: event.images?.[0]?.url || "../logo/gg_profile.png",
          }));
          setEvents(trendingEvents);
        } else {
        
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchEvents();
    }
  }, [query]);

  const handleRefetch = () => {
    setEvents([]); 
    setError(null);
   
    setLoading(true); 
    setTimeout(() => {
      setLoading(false);
    }, 0); 
  };

  return (
    <section className="top-trending">
      <h2 className="section-title">What You're Looking For</h2>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && events.length === 0 && <p>No events found matching your query.</p>}
      <div className="cards">
        {!loading && events.length > 0 && events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
      <button onClick={handleRefetch}>Refresh</button>
    </section>
  );
};

export default FilteredEvents;
