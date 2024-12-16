import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import "../pages/Explore.css";

const EventsUnder30 = ({ userLocation, searchQuery }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const apikey = process.env.REACT_APP_API_KEY; 

  useEffect(() => {
    if (!userLocation) return; 
    
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${userLocation}&radius=50&locale=*&apikey=${apikey}`
        );
        const data = await response.json();

        if (data._embedded?.events) {
          const filteredEvents = data._embedded.events
            .filter(
              (event) =>
                event.priceRanges?.[0]?.min <= 30
                
            )
            .slice(0, 5)
            .map((event) => ({
              id: event.id,
              title: event.name,
              time: event.dates.start.localDate,
              location: event._embedded.venues?.[0]?.name || 'Unknown Location',
              price: event.priceRanges?.[0]?.min || 'N/A',
              followers: event._embedded.attractions?.[0]?.upcomingEvents?._total || 'N/A',
              imgSrc: event.images?.[0]?.url || '../logo/gg_profile.png',
            }));
          setEvents(filteredEvents);
        } else {
          setEvents([]); 
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, [userLocation, searchQuery]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section className="events-under-30">
      <h2 className="section-title">Events $30 and Under</h2>
      <div className="cards">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              time={event.time}
              location={event.location}
              price={event.price}
              followers={event.followers}
              imgSrc={event.imgSrc}
            />
          ))
        ) : (
          <p>No events found under $30 near you.</p>
        )}
      </div>
    </section>
  );
};

export default EventsUnder30;
