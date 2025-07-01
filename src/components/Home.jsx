import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import TopTrending from './TopTrending';
import Reviews from './Reviews';
import WhyChooseUs from './WhyChooseUs';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <TopTrending></TopTrending>
            <WhyChooseUs></WhyChooseUs>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;