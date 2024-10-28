import React from 'react';
import './About.css';
import aboutUsImage1 from '../assets/images/aboutUsImage1.png';
import aboutUsImage2 from '../assets/images/aboutUsImage2.png';

function About() {
    return (
        <div className="about-us">
            {/* Header Section */}
            <header className="header-section">
                <h1>About Us</h1>
                <img src={aboutUsImage1} alt="Illustration" className="header-image" />
            </header>

            {/* Values Section */}
            <section className="values-section">
                <h2>Our Values</h2>
                <p>We strive to make every experience by bringing communities together through...</p>
                <div className="values-grid">
                    <div className="value-card">
                        <h3>Simplicity</h3>
                        <p>Creating ease in user experience</p>
                    </div>
                    <div className="value-card">
                        <h3>Engagement</h3>
                        <p>Keeping our users connected and interested</p>
                    </div>
                    <div className="value-card">
                        <h3>Discovery</h3>
                        <p>Helping users find new experiences</p>
                    </div>
                    <div className="value-card">
                        <h3>Community</h3>
                        <p>Connecting people to build a shared community</p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <h2>Meet Our Team</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Team Member 1</p>
                    </div>
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Team Member 2</p>
                    </div>
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Team Member 3</p>
                    </div>
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Team Member 4</p>
                    </div>
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Team Member 5</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <h2>Contact Us</h2>
                <form className="contact-form">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Subject" />
                    <textarea placeholder="Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>
        </div>

        
    );
}

export default About;
