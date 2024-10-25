require('dotenv').config()

apikey = process.env.API_KEY;

fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?city=NYC&apikey=${apikey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    for (let i = 0; i< 5; i++){
      console.log(data._embedded.attractions[i].name);
    }
    
    
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });

