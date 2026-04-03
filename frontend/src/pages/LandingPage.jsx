import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Architecture from '../components/Architecture';
import Capabilities from '../components/Capabilities';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Architecture />
            <Capabilities />
            <Footer />
        </div>
    );
};

export default LandingPage;
