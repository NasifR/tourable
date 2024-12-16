import React, { useRef } from 'react';
import './About.css';
import aboutUsImage1 from '../assets/images/aboutUsImage1.png';
import aboutUsImage2 from '../assets/images/aboutUsImage2.png';
import emailjs from '@emailjs/browser';  

function About() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

    emailjs.sendForm(
        'service_brjsl94',     
        'template_q0bwruj', 
        form.current,   
        'YJqH5POC7qmfxBfiH'      
    )
    .then((result) => {
        console.log('Success:', result.text);
        alert('Message sent successfully!'); 
        form.current.reset(); // Clear form fields
    })
    .catch((error) => {
        console.error('Error:', error.text);
        alert('Failed to send message. Please try again.'); 
    });
};
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
                        <p>Arbab Husain</p>
                    </div>
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Jolie Huang</p>
                    </div>
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Nasif Rahman</p>
                    </div>
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Pretam Chowdhury</p>
                    </div>
                    <div className="team-member">
                        <img src={aboutUsImage2} alt="Team Member" />
                        <p>Thamida Choudhury</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <h2>Contact Us</h2>
                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <input type="text" name="name" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="text" name="subject" placeholder="Subject" required />
                    <textarea name="message" placeholder="Message" required ></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>
        </div>

        
    );
}

export default About;
