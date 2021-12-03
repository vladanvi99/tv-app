import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getMoviesGenres } from '../../redux/actions/genres';
import { getBannerMovie, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../../redux/actions/movies';
import { MOVIES_GENRES_RESET } from '../../redux/constants/genres';
import { MOVIES_BANNER_RESET, MOVIES_POPULAR_RESET, MOVIES_TOP_RATED_RESET, MOVIES_UPCOMING_RESET } from '../../redux/constants/movies';
import MovieBanner from '../MovieBanner/MovieBanner';
import './css/moviesPage.scss';
import MoviesSlider from './MoviesSlider/MoviesSlider';

const MoviesPage = () => {
    const {type = 'movie'} = useParams();
    const [mainMovie, setMainMovie] = useState({});
    const [popularMovies, setPopularMovies] = useState({});
    const [topRatedMovies, setTopRatedMovies] = useState({});
    const [upcomingMovies, setUpcomingMovies] = useState({});
    const [openGenres, setOpenGenres] = useState(false);
    const getTopRatedData = useSelector(state => state.getTopRated)
    const {topRatedData} = getTopRatedData;
    const getPopularData = useSelector(state => state.getPopular)
    const {popularData} = getPopularData;
    const getBannerData = useSelector(state => state.getBanner)
    const {bannerData} = getBannerData;
    const getUpcomingData = useSelector(state => state.getUpcoming)
    const {upcomingData} = getUpcomingData;
    const getMoviesGenresData = useSelector(state => state.getMoviesGenres)
    const {moviesGenresData} = getMoviesGenresData;
    const page = 1;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: MOVIES_TOP_RATED_RESET});
        dispatch({type: MOVIES_POPULAR_RESET});
        dispatch({type: MOVIES_UPCOMING_RESET});
        dispatch({type: MOVIES_GENRES_RESET});
        dispatch({type: MOVIES_BANNER_RESET});
    }, [type, dispatch])
    useEffect(() => {
        setOpenGenres(false);
        const link = type === 'tv' ? 'on_the_air' : 'upcoming';
        if(!bannerData || !popularData || !topRatedData || !upcomingData || !moviesGenresData) {
            if(!bannerData) {
                dispatch(getBannerMovie({movies_shows: 'top_rated', type}))
            } else if(!popularData) {
                dispatch(getPopularMovies({page, type}));
            } else if(!topRatedData) {
                dispatch(getTopRatedMovies({page, type}));
            } else if (!upcomingData) {
                dispatch(getUpcomingMovies({page, type, link}));
            } else if (!moviesGenresData) {
                dispatch(getMoviesGenres({type}));
            }
        } else {
            setMainMovie(bannerData.results[Math.floor(Math.random() * 20)]);
            setPopularMovies(popularData);
            setTopRatedMovies(topRatedData);
            setUpcomingMovies(upcomingData);
        }
    }, [bannerData, popularData, topRatedData, upcomingData, moviesGenresData, type, dispatch]);
    return (
        <div className="movies-page-holder">
            {bannerData && <MovieBanner type={type} bannerData={mainMovie} />}
            <div className="genres-search-holder">
                <h3>Search By Genre</h3>
                <div className="genres-items-holder">
                    <button type="button" onClick={() => setOpenGenres(!openGenres)}>
                        Genres <i className="fas fa-chevron-down"></i>
                    </button>
                    <ul className="genres-items" style={{display: `${openGenres ? 'block' : 'none'}`}}>
                        {
                            moviesGenresData && (
                                moviesGenresData.genres.map((genre) => (
                                    <li key={genre.id}>
                                        <Link to={`/search/${type}/${genre.id}?page=1`}>{genre.name}</Link>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="movies-sliders-holder">
                {topRatedMovies.results && <MoviesSlider type={type} name={'Top Rated'} movies={topRatedMovies.results} />}
                {popularMovies.results && <MoviesSlider type={type} name={'Popular'} movies={popularMovies.results} />}
                {upcomingMovies.results && <MoviesSlider type={type} name={'Upcoming'} movies={upcomingMovies.results} />}
            </div>
        </div>
    )
}

export default MoviesPage;
