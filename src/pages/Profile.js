import React, { useEffect, useState } from "react";
import profile_cover from "../assets/images/profile_cover.png";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import './Profile.css';
import { Authenticator } from "../component/Authenticator";
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";

const EventCard = ({ title, time, location, price, followers, imgSrc }) => (
  <div className="card1">
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

const FavoriteEvents = () => (
  <section className="top-trending">
    <h2 className="section-title">Favorite Events</h2>
    <div className="cards">
      <EventCard
        title="Harry Styles Concert"
        time="Tomorrow 9:00 PM"
        location="Madison Square Garden"
        price="169.00"
        followers="260"
        imgSrc="concert.jpg"
      />
      {/* Add more EventCards here */}
    </div>
  </section>
);

function Profile() {
  const [userAttributes, setUserAttributes] = useState(null);
  const [cityName, setCityName] = useState("Fetching location...");

  useEffect(() => {
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

    // Fetch user location
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Use a geocoding API to fetch city name
              const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d3e9e6e84f2142299be1b6e210bb4ce2`
              );
              const data = await response.json();
              const city =
                data.results[0]?.components?.city ||
                data.results[0]?.components?.town ||
                "Unknown Location";
              setCityName(city);
            } catch (error) {
              console.error("Error fetching city name:", error);
              setCityName("Location unavailable");
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            setCityName("Location permission denied");
          }
        );
      } else {
        setCityName("Geolocation not supported");
      }
    };

    fetchLocation();
  }, []);

  return (
    <Authenticator variation="modal">
      {({ signOut, user }) => (
        <div className="bg-white">
          <div className="pt-20" style={{ backgroundColor: "#452A1A" }}>
            <img src={profile_cover} alt="cover" className="w-full" />
          </div>

          <div
            className="pl-[32%] text-white"
            style={{ backgroundColor: "#452A1A" }}
          >
            <div className="max-w-2xl">
              <h1 className="text-5xl pt-10 mb-2">
                {userAttributes ? userAttributes.name : "Loading..."}
              </h1>
              <h2 className="text-lg mb-3">{cityName}</h2>
              <p>Profile description</p>

              <div className="flex space-x-4 mt-4 pb-5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-white text-2xl hover:text-gray-300" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-white text-2xl hover:text-gray-300" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-white text-2xl hover:text-gray-300" />
                </a>
              </div>
              <button
                onClick={signOut}
                className="py-2 px-4 mb-5 bg-white text-black font-bold rounded-full"
              >
                Log out
              </button>
            </div>
          </div>

          <div>
            <FavoriteEvents />
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default Profile;
