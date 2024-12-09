
import { useEffect, useState } from 'react';
import React from "react";
import EventCard from "./EventCard"

const apikey = process.env.REACT_APP_API_KEY;

const TopTrending = () => {
  const [events, setEvents] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${apikey}`)
    .then(response => response.json())
    .then(data => {
      if (data._embedded?.events) {
        const trendingEvents = data._embedded.events.slice(0, 3).map(event => ({
          title: event.name,
          time: event.dates.start.localDate,
          location: event._embedded.venues[0].name,
          price: event.priceRanges?.[0]?.min || "N/A",
          followers: event._embedded.attractions?.[0]?.upcomingEvents?._total || "N/A",
          imgSrc: event.images[0]?.url || "../logo/gg_profile.png",
        }));
        setEvents(trendingEvents);
        console.log(trendingEvents)
      }
    })
    .catch(err => console.error("Error fetching events:", err));
}, [fetchTrigger]);

const handleRefetch = () => {
  setFetchTrigger(prev => prev + 1);
};


  return (
    <section className='top-trending'>
      <h2 className='section-title'>Top Trending in NYC</h2>
      <div className='cards'>
        {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        
      </div>
      <button onClick={handleRefetch}>Refresh</button>
    </section>
  )


}

export default TopTrending;


