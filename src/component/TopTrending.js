import { useEffect, useState } from "react";
import React from "react";
import EventCard from "./EventCard";
import "../pages/Explore.css";

const apikey = process.env.REACT_APP_API_KEY;

const TopTrending = ({ userLocation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userLocation) return;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${userLocation}&radius=50&locale=*&apikey=${apikey}`
        );
        const data = await response.json();

        if (data._embedded?.events) {
          const trendingEvents = data._embedded.events.slice(0, 5).map((event) => ({
            title: event.name,
            time: event.dates.start.localDate,
            location: event._embedded.venues?.[0]?.name || "Unknown Location",
            price: event.priceRanges?.[0]?.min || "N/A",
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

    fetchEvents();
  }, [userLocation]);

  const handleRefetch = () => {
   
    setEvents([]); 
    setError(null);
  };

  return (
    <section className="top-trending">
      <h2 className="section-title">Top Trending Near You</h2>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && events.length === 0 && <p>No events found near you.</p>}
      <div className="cards">
        {!loading &&
          events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
      </div>
      <button onClick={handleRefetch}>Refresh</button>
    </section>
  );
};

export default TopTrending;
