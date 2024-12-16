import { useEffect, useState } from "react";
import React from "react";
import EventCard from "./EventCard";
import "../pages/Explore.css";
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";

const apikey = process.env.REACT_APP_API_KEY;

const TopTrending = ({ userLocation}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]); // To track user's favorites
  const [userAttributes, setUserAttributes] = useState(null);

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
            eventId: event.id // Add unique event ID
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

    const fetchUserDetails = async () => {
          try {
            const session = await fetchAuthSession();
            const attributes = await fetchUserAttributes(session.user);
            setUserAttributes(attributes);
          } catch (error) {
            console.error("Error fetching user attributes:", error);
          }
        };
    
    fetchUserDetails();
    fetchEvents();
  }, [userLocation]);

  const handleFavoriteClick = async (event) => {
    if (!userAttributes?.email) {
      alert("Please log in to add to favorites.");
      return;
    }
  
    try {
      // Check if the event is already in favorites
      const isAlreadyFavorite = favorites.some((fav) => fav.eventId === event.eventId);
      
      let updatedFavorites;
      if (isAlreadyFavorite) {
        updatedFavorites = favorites.filter((fav) => fav.eventId !== event.eventId); // Remove if already in favorites
      } else {
        updatedFavorites = [...favorites, event]; // Add if not already in favorites
      }
  
      setFavorites(updatedFavorites);  // Update the local favorites state
  
      // Send updated favorite events to the backend to store
      await fetch("http://localhost:5000/api/updateFavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userAttributes.email,
          favoriteEvents: updatedFavorites,  // Send updated list
        }),
      });
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };
  
  

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
          events.map((event) => {
            const isFavorite = favorites.some((fav) => fav.eventId === event.eventId);
            return (
              <EventCard
                key={event.eventId}
                {...event}
                onFavoriteClick={() => handleFavoriteClick(event)}
                isFavorite={isFavorite}
              />
            );
          })}
      </div>
      <button onClick={handleRefetch}>Refresh</button>
    </section>
  );
};

export default TopTrending;
