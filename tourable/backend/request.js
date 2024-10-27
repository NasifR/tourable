require('dotenv').config()

apikey = process.env.API_KEY;
const apikey = process.env.API_KEY;

fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?city=NYC&apikey=${apikey}`)
fetch(`https://app.ticketmaster.com/discovery/v2/events.json?dmaId=345&apikey=${apikey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Top 5 events:")
    for (let i = 0; i< 5; i++){
      
      console.log(data._embedded.events[i].name);
      console.log(data._embedded.events[i].url);
      console.log("\n")
      
    }
    
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
  
  fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?source=ticketmaster&stateCode=345&apikey=${apikey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("\nTop 5 attractions:")
    for (let i = 0; i< 5; i++){
      
      console.log(data._embedded.attractions[i].name);
      console.log(data._embedded.attractions[i].url);
      console.log("\n")
     
    }
    


  })