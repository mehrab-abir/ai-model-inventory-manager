import React from 'react';
import Banner from './Banner';
import FeaturedModels from './FeaturedModels';
import AboutModels from './AboutModels';
import GetStarted from './GetStarted';

const Home = () => {
    return (
        <div className='pt-20'>
            <title>AI Model Inventory - Home</title>
            <Banner></Banner>
            <FeaturedModels></FeaturedModels>
            <AboutModels></AboutModels>
            <GetStarted></GetStarted>
        </div>
    );
};

export default Home;