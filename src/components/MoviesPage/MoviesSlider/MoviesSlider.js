import React, { useEffect, useRef, useState }  from 'react';
import { Link } from 'react-router-dom';
import { setMoviesBy } from '../../../helpers';
import './css/moviesSlider.scss';
import MovieItem from './MovieItem/MovieItem';

const MoviesSlider = ({name, movies, type}) => {
    const [positionIndex, setPositionIndex] = useState(0);
    const sliderRef = useRef();
    const makePosition = (direction) => {
        const parentDistance = sliderRef.current.parentNode.getBoundingClientRect().x;
        const distance = sliderRef.current.getBoundingClientRect().x - parentDistance;
        const trackSliderSpace = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const itemWidth = [...sliderRef.current.childNodes][0].getBoundingClientRect().width + 10;
        if(direction === "left") {
            if(positionIndex !== 0) {
                if(positionIndex === 1) {
                    sliderRef.current.style.transform = `translateX(${0}px)`;
                } else {
                    sliderRef.current.style.transform = `translateX(${itemWidth + distance}px)`;
                }
                setPositionIndex(state => state - 1);
            }
        } else if (direction === "right") {
            if (itemWidth * positionIndex < trackSliderSpace) {
                if(itemWidth * positionIndex >= trackSliderSpace - itemWidth) {
                    sliderRef.current.style.transform = `translateX(${-trackSliderSpace}px)`;
                } else {
                    sliderRef.current.style.transform = `translateX(${-itemWidth + distance}px)`
                }
                setPositionIndex(state => state + 1);
            }
        }
    }
    useEffect(() => {
        sliderRef.current.style.transform = `translateX(${0}px)`;
        setPositionIndex(0);
    }, [type])
    if(movies) {
        return (
            <div className="movies-slider-holder">
                <div className="see-more">
                    <h3>{name}</h3>
                    <Link to={`/search/${type}/${setMoviesBy(name, type)}?page=1`}>
                        See More
                    </Link>
                </div>
                <div className="movies-slider-wrap">
                    <button className="arrow-slide arrow-left" type="button" onClick={() => makePosition('left')}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="movies-slider">
                        <div className="movies-slider-track" ref={sliderRef}>
                            {
                                movies.map((movie, index) => {
                                    if(index < 10) {
                                        return (
                                            <MovieItem type={type} key={movie.id} movie={movie} />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <button className="arrow-slide arrow-right" type="button" onClick={() => makePosition('right')}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default MoviesSlider;
