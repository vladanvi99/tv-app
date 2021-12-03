import React from 'react';
import TvImage from './images/tv-img.png';
import TvVideo from './videos/tv-video.m4v';
import MobileImage from './images/mobile-img.jpg';
import MobileBoxShot from './images/boxshot-mobile-img.png';
import MobileGifBoxShot from './videos/mobile-gif-boxshot.gif';
import TvImageEveryWhere from './images/watch-everywhere.png';
import TvVideoEverywhere from './videos/watch-everywhere.m4v';
import KidsImage from './images/kids.png';

import './css/homeServices.scss';

const HomeServices = () => {
    return (
        <div className="home-services-holder">
            <div className="service-holder">
                <div className="service-card">
                    <div className="service-card-text">
                        <h2>Enjoy on your TV.</h2>
                        <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                    <div className="service-card-animation-holder">
                        <div className="service-card-animation">
                            <img src={TvImage} alt="tv-image" />
                            <div className="animation-card">
                                <video autoPlay playsInline muted loop>
                                    <source src={TvVideo} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="service-holder">
                <div className="service-card column-reverse">
                    <div className="service-card-animation-holder">
                        <div className="service-card-animation">
                            <img src={MobileImage} alt="mobile-image" />
                            <div className="animation-card-download">
                                <div className="animation-card-image">
                                    <img src={MobileBoxShot} alt="mobile-image" />
                                </div>
                                <div className="animation-card-text">
                                    <p className="first-para">Stranger Things</p>
                                    <p className="second-para">Downloading...</p>
                                </div>
                                <div className="animation-card-gif">
                                    <img src={MobileGifBoxShot} alt="img-mobile-gif" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="service-card-text">
                        <h2>Enjoy on your TV.</h2>
                        <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                </div>
            </div>
            <div className="service-holder">
                <div className="service-card">
                    <div className="service-card-text">
                        <h2>Enjoy on your TV.</h2>
                        <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                    <div className="service-card-animation-holder">
                        <div className="service-card-animation">
                            <img src={TvImageEveryWhere} alt="tv-image" />
                            <div className="animation-card animation-cart-watch">
                                <video autoPlay playsInline muted loop>
                                    <source src={TvVideoEverywhere} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="service-holder">
                <div className="service-card column-reverse">
                    <div className="service-card-animation-holder">
                        <div className="service-card-animation">
                            <img src={KidsImage} alt="kids" />
                        </div>
                    </div>
                    <div className="service-card-text">
                        <h2>Enjoy on your TV.</h2>
                        <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeServices;
