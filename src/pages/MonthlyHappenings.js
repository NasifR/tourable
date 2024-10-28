// MonthlyHappenings.js
import React from 'react';
import Slider from 'react-slick';
import './Explore.css';

const MonthlyHappenings = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 cards at a time
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

    const EventCard = ({ title, time, location, price, followers, imgSrc }) => (
        <div className="card">
            <img src={imgSrc} alt="Event" />
            <div className="content">
                <h3>{title}</h3>
                <p>{time}</p>
                <p>{location}</p>
                <p>From ${price}</p>
                <p>{title} | 👥 {followers} followers</p>
            </div>
        </div>
    );

    return (
        <section className="monthly-happenings">
            <div className="section-title-container">
            <h2 className="section-title">Monthly </h2>
            <h2 className="section-title">Happenings </h2>
            </div>
            <p>We've handpicked these events for you.</p>
            <Slider {...settings} className="cards-slider">
                <EventCard
                    title="Harry Styles Concert"
                    time="Tomorrow 9:00 PM"
                    location="Madison Square Garden"
                    price="From $169.00"
                    followers="260 followers"
                    imgSrc="concert.jpg" // Replace with your image source
                />
                <EventCard
                    title="Harry Styles Concert"
                    time="Tomorrow 9:00 PM"
                    location="Madison Square Garden"
                    price="From $169.00"
                    followers="260 followers"
                    imgSrc="concert.jpg" // Replace with your image source
                />
                <EventCard
                    title="Harry Styles Concert"
                    time="Tomorrow 9:00 PM"
                    location="Madison Square Garden"
                    price="From $169.00"
                    followers="260 followers"
                    imgSrc="concert.jpg" // Replace with your image source
                />
                {/* Add more <EventCard /> components as needed */}
            </Slider>
        </section>
    );
};

export default MonthlyHappenings;
