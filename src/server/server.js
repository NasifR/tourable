const apikey = process.env.REACT_APP_API_KEY;

fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=bIrRCl5nIjARdcDGGQ1NcQ9LtNVmqHie`)
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Logs the fetched data to the console
  })
  .catch(err => console.error("Error fetching events:", err));
