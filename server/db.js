
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tourable:tourable@tourabledb.x62fh.mongodb.net/?retryWrites=true&w=majority&appName=tourabledb";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("tourabledb");
    const eventsCollection = db.collection("Events")

    const events = [
      {
        name: "Tech Conference 2024",
        url: "https://example.com/tech-conference",
        date: new Date("2024-11-30T10:00:00Z"),
      },
      {
        name: "Music Festival",
        url: "https://example.com/music-festival",
        date: new Date("2024-12-01T18:00:00Z"),
      },
      {
        name: "Art Exhibition",
        url: "https://example.com/art-exhibition",
        date: new Date("2024-12-05T12:00:00Z"),
      },
      {
        name: "Startup Pitch Night",
        url: "https://example.com/startup-pitch",
        date: new Date("2024-11-29T19:00:00Z"),
      },
      {
        name: "Coding Bootcamp Demo Day",
        url: "https://example.com/demo-day",
        date: new Date("2024-12-10T14:00:00Z"),
      },
    ];

    const result = await eventsCollection.insertMany(events)
    const eventList = await eventsCollection.find({}).toArray();
    console.log("Events in the database:");
    events.forEach((event) => {
      console.log(`- ${event.name}: ${event.url} on ${event.date}`);
    })
  } finally {
    
    await client.close();
  }
}
run().catch(console.dir);
