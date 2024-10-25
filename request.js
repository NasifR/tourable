require('dotenv').config()

apikey = process.env.API_KEY;




fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${apikey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data._links);
    // Parse the response and do other things with `data`.
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });

