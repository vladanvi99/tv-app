import React from 'react';
import './css/rating.scss';

const Rating = ({vote}) => {
    return (
        <div className="rating-holder">
            <div className="stars-holder">
                <span>
                    {vote < 0.5 ? <i className="far fa-star"></i> : vote <= 1 ? <i className="fas fa-star-half-alt"></i>  : <i className="fas fa-star"></i> }
                </span>
                <span>
                    {vote < 2.5 ? <i className="far fa-star"></i> : vote <= 3 ? <i className="fas fa-star-half-alt"></i>  : <i className="fas fa-star"></i> }
                </span>
                <span>
                    {vote < 4.5 ? <i className="far fa-star"></i> : vote <= 5 ? <i className="fas fa-star-half-alt"></i>  : <i className="fas fa-star"></i> }
                </span>
                <span>
                    {vote < 6.5 ? <i className="far fa-star"></i> : vote <= 7 ? <i className="fas fa-star-half-alt"></i>  : <i className="fas fa-star"></i> }
                </span>
                <span>
                    {vote < 8.5 ? <i className="far fa-star"></i> : vote <= 9 ? <i className="fas fa-star-half-alt"></i>  : <i className="fas fa-star"></i> }
                </span>
            </div>
            <p className="rating-num">{vote}</p>
        </div>
    )
}

export default Rating;
