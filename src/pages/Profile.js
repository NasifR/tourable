import React, { useEffect, useState } from "react";
import profile_cover from "../assets/images/profile_cover.png";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import './Profile.css';
import { Authenticator } from "../component/Authenticator";
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";
import axios from "axios";
import EventCard from "../component/EventCard";

function Profile() {
  const [userAttributes, setUserAttributes] = useState(null);
  const [cityName, setCityName] = useState("Fetching location...");
  const [favoriteEvents, setFavoriteEvents] = useState([]); // To store user's favorite events

  useEffect(() => {
    const addUserToDatabase = async (name, email) => {
      try {
        const response = await axios.post("http://localhost:5000/api/addUser", {
          name,
          email,
        });
        console.log(response.data.message);
      } catch (error) {
        console.error("Error adding user to database:", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const session = await fetchAuthSession();
        const attributes = await fetchUserAttributes(session.user);
        setUserAttributes(attributes);
        // Add user to database if it doesn't exist
        if (attributes?.name && attributes?.email) {
          await addUserToDatabase(attributes.name, attributes.email);
        }
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

  // Fetch user's favorite events from the backend
  const fetchFavoriteEvents = async () => {
    if (!userAttributes?.email) return;

    try {
      const response = await axios.post("http://localhost:5000/api/getFavorites", {
        email: userAttributes.email,
      });
      setFavoriteEvents(response.data.favoriteEvents); // Set the favorite events from response
    } catch (error) {
      console.error("Error fetching favorite events:", error);
    }
  };

  useEffect(() => {
    if (userAttributes?.email) {
      fetchFavoriteEvents(); // Fetch favorite events when user is logged in
    }
  }, [userAttributes]);

  return (
    <Authenticator variation="modal">
      {({ signOut, user }) => (
        <div className="bg-white">
          <div className="pt-20" style={{ backgroundColor: "#452A1A" }}>
            <img src={profile_cover} alt="cover" className="w-full" />
          </div>

          <div className="pl-[32%] text-white" style={{ backgroundColor: "#452A1A" }}>
            <div className="max-w-2xl">
              <h1 className="text-5xl pt-10 mb-2">
                {userAttributes ? userAttributes.name : "Loading..."}
              </h1>
              <h2 className="text-lg mb-3">{cityName}</h2>

              <div className="flex space-x-4 mt-4 pb-5">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-white text-2xl hover:text-gray-300" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="text-white text-2xl hover:text-gray-300" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-white text-2xl hover:text-gray-300" />
                </a>
              </div>
              <button onClick={signOut} className="py-2 px-4 mb-5 bg-white text-black font-bold rounded-full">
                Log out
              </button>
            </div>
          </div>

          <div>
            <FavoriteEvents favoriteEvents={favoriteEvents} />
          </div>
        </div>
      )}
    </Authenticator>
  );
}

// FavoriteEvents Component to display favorite events
const FavoriteEvents = ({ favoriteEvents }) => (
  <section className="top-trending">
    <h2 className="section-title">Favorite Events</h2>
    <div className="cards">
      {favoriteEvents.length > 0 ? (
        favoriteEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            time={event.time}
            location={event.location}
            price={event.price}
            followers={event.followers}
            imgSrc={event.imgSrc}
          />
        ))
      ) : (
        <p>No favorite events yet.</p>
      )}
    </div>
  </section>
);

export default Profile;
