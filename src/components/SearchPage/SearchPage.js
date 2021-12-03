import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { setMoviesBy } from '../../helpers';
import { getMoviesByGenres } from '../../redux/actions/genres';
import { getBannerMovie, getListMovies } from '../../redux/actions/movies';
import { MOVIES_BY_GENRES_RESET } from '../../redux/constants/genres';
import { MOVIES_BANNER_RESET, MOVIES_LIST_RESET } from '../../redux/constants/movies';
import MovieBanner from '../MovieBanner/MovieBanner';
import MovieList from '../MovieList/MovieList';
import './css/searchPage.scss';

const SearchPage = () => {
    const [mainMovie, setMainMovie] = useState();
    const [moviesArr, setMoviesArr] = useState();
    const location = useLocation();
    const page = location.search.split('=')[1];
    const {type = 'movie', by = 'top_rated'}= useParams();
    const getListData = useSelector(state => state.getList)
    const {listData} = getListData;
    const getBannerData = useSelector(state => state.getBanner)
    const {bannerData} = getBannerData;
    const getMoviesByGenresData = useSelector(state => state.getMoviesByGenres);
    const {moviesByGenresData} = getMoviesByGenresData;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: MOVIES_BANNER_RESET});
        dispatch({type: MOVIES_LIST_RESET});
        dispatch({type: MOVIES_BY_GENRES_RESET});
    }, [type, by, page])
    useEffect(() => {
        if(setMoviesBy(by) !== 'upcoming' || setMoviesBy(by) !== 'popular' || setMoviesBy(by) !== 'on_the_air' || setMoviesBy(by) !== 'top_rated') {
            if(!moviesByGenresData) {
                dispatch(getMoviesByGenres({page, by, type}));
            } else {
                setMoviesArr(moviesByGenresData);
                setMainMovie(moviesByGenresData.results[Math.floor(Math.random() * moviesByGenresData.results.length)]);
            }
        } else {
            if(!bannerData || !listData) {
                if(!bannerData) {
                    dispatch(getBannerMovie({movies_shows: by, type}));
                } else if (!listData) {
                    dispatch(getListMovies({page, type, by}));
                }
            } else {
                setMoviesArr(listData);
                setMainMovie(bannerData.results[Math.floor(Math.random() * 20)]);
            }
        }
    }, [bannerData, listData, moviesByGenresData, type, by, page]);
    return (
        <div className="search-page-holder">
            {bannerData && <MovieBanner type={type} bannerData={mainMovie} />}
            {listData && <MovieList page={page} type={type} by={by} moviesData={moviesArr} />}
            {moviesByGenresData && <MovieBanner type={type} bannerData={mainMovie} />}
            {moviesByGenresData && <MovieList page={page} type={type} by={by} moviesData={moviesArr} />}
        </div>
    )
}

export default SearchPage;
