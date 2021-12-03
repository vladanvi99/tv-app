import React from 'react';
import './css/homePage.scss';
import HomeAccords from './HomeAccords/HomeAccords';
import HomeBanner from './HomeBanner/HomeBanner';
import HomeServices from './HomeServices/HomeServices';

const HomePage = () => {
    return (
        <div>
            <HomeBanner />
            <HomeServices />
            <HomeAccords />
        </div>
    )
}

export default HomePage;
