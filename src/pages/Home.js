import React from "react";
import "../App.css";
import "../tailwind.css";
import bg from "../assets/images/home_bg.png";

function Home() {
  const style = {
    //backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
    <main className="h-screen w-screen" style={style}>
      <div className="h-[40rem] w-full flex flex-col justify-center px-[2rem] md:px-[5rem] lg:px-[7rem]">
        <h1 className="text-white font-bold text-[3rem] sm:text-[3.5rem] md:text-[4rem] h-[70px] md:h-[80px]">Ready to explore</h1>
        <h1 className="text-white font-bold text-[3rem] sm:text-[3.5rem] md:text-[4rem] h-[70px] md:h-[80px]">the world out</h1>
        <h1 className="text-white font-bold text-[3rem] sm:text-[3.5rem] md:text-[4rem] h-[60px] md:h-[70px]">there?</h1>
        <h3 className="text-gray-400 text-2xl sm:text-2xl md:text-3xl mt-[1rem] md:mt-[2rem]">
          Discover events, tours, and experiences
        </h3>
        <h3 className="text-gray-400 text-2xl sm:text-2xl md:text-3xl">tailored just for you</h3>

        <button className="w-[10rem] sm:w-[12rem] md:w-[13rem] py-[6px] bg-gray-300 rounded-full text-black font-bold text-[18px] sm:text-[20px] md:text-[22px] hover:bg-black hover:text-white transition-all mt-[2rem] md:mt-[3rem]">
          Explore Here
        </button>
      </div>

      {/* Cards */}
      <div className="absolute bottom-10 right-10 flex space-x-6 h-[2rem]">
        {/* Card 1 */}
        <div className="bg-gray-500 bg-opacity-50 p-6 rounded-lg w-64 h-64 flex flex-col justify-start items-center text-white transition transform hover:scale-105 hover:bg-opacity-75">
          <h4 className="font-bold text-xl">Event 1</h4>
          <p className="text-sm mt-1">Event description</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-gray-500 bg-opacity-50 p-6 rounded-lg w-64 h-64 flex flex-col justify-start items-center text-white transition transform hover:scale-105 hover:bg-opacity-75">
          <h4 className="font-bold text-xl">Event 2</h4>
          <p className="text-sm mt-1">Event description</p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-500 bg-opacity-50 p-6 rounded-lg w-64 h-64 flex flex-col justify-start items-center text-white transition transform hover:scale-105 hover:bg-opacity-75">
          <h4 className="font-bold text-xl">Event 3</h4>
          <p className="text-sm mt-1">Event description</p>
        </div>
      </div>


    </main>
    </div>
  );
}

export default Home;
