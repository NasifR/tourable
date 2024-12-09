// MonthlyHappenings.js
import React, { useState, useEffect} from 'react';
import Slider from 'react-slick';
import './Explore.css';
import EventCard from '../component/EventCard';

const apikey = process.env.REACT_APP_API_KEY;
const MonthlyHappenings = ( {userLocation}) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!userLocation) return;

        fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${userLocation}&radius=50&priceRange=0,30&locale=*&apikey=${apikey}`
        )
        .then((response) => response.json())
        .then((data) => {
            if (data._embedded?.events) {
            const fetchedEvents = data._embedded.events.map((event) => ({
                title: event.name,
                time: event.dates.start.localDate,
                location: event._embedded.venues[0]?.name || "Unknown Location",
                price: event.priceRanges?.[0]?.min || "N/A",
                followers:
                event._embedded.attractions?.[0]?.upcomingEvents?._total || "N/A",
                imgSrc: event.images[0]?.url || "../logo/gg_profile.png",
            }));
            setEvents(fetchedEvents);
            }
        })
        .catch((err) => console.error("Error fetching events:", err));
    }, [userLocation]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    

    return (
        <section className="monthly-happenings">
            <div className="section-title-container">
            <h2 className="section-title">Monthly </h2>
            <h2 className="section-title">Happenings </h2>
            </div>
            <p>We've handpicked these events for you.</p>
            <Slider {...settings} className="cards-slider">
                {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
                {/* Add more <EventCard /> components as needed */}
            </Slider>
        </section>
    );
};

export default MonthlyHappenings;
