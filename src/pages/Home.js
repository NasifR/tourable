import React from "react";
import '../App.css'
import '../tailwind.css';
import bg from '../assets/images/home_bg.png';

function Home() {
    const style = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // keeps the image fixed on scroll
    };

    return (
        <main className="h-screen w-screen" style={style}>
            <div className="text-white text-center pt-20">Home</div>
            <div className="text-white text-center pt-10">Hello</div>
        </main>
    );
}

export default Home;
