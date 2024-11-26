
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const apikey = process.env.API_KEY;

if (!apikey) {
  console.error("API Key is missing. Make sure to set it in your .env file.");
  process.exit(1);
}


const fetchData = async (url, key) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ticketmaster API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data._embedded?.[key]?.slice(0, 5) || [];
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return []; // Return an empty array in case of error
  }
};

app.get("/", (req, res) => {
    res.send("Welcome to the Ticketmaster API Backend!");
  });


app.get("/events", async (req, res) => {
  const eventsUrl = `https://app.ticketmaster.com/discovery/v2/events.json?dmaId=345&apikey=${apikey}`;
  const events = await fetchData(eventsUrl, "events");

  // Format and send response
  res.json(
    events.map((event) => ({
      name: event.name,
      url: event.url,
    }))
  );
});


app.get("/attractions", async (req, res) => {
  const attractionsUrl = `https://app.ticketmaster.com/discovery/v2/attractions.json?source=ticketmaster&stateCode=345&apikey=${apikey}`;
  const attractions = await fetchData(attractionsUrl, "attractions");

  // Format and send response
  res.json(
    attractions.map((attraction) => ({
      name: attraction.name,
      url: attraction.url,
    }))
  );
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
