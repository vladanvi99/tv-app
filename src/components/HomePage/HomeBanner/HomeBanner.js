import React from 'react';
import BannerBg from '../../../images/bannerBg.jpg';
import { Link } from 'react-router-dom';
import './css/homeBanner.scss';

const HomeBanner = () => {
    return (
        <div className="home-banner" style={{backgroundImage: `url(${BannerBg})`}}>
            <div className="overlay"></div>
            <div className="home-banner-content">
                <h1>Searh for movies, TV shows, and more.</h1>
                <p className="first-para">Search from anywhere. Search anytime.</p>
                <p className="second-para">Ready to start? Click on button to create your account.</p>
                <Link className="create-account-button" to="/signup">
                    Create Account
                </Link>
            </div>
        </div>
    )
}

export default HomeBanner;
