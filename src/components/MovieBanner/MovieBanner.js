import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAddMovie, userDeleteMovie, userGetMovieList } from '../../redux/actions/user';
import Rating from '../Rating/Rating';
import './css/movieBanner.scss';

const MovieBanner = ({bannerData, type}) => {
    const dispatch = useDispatch();
    const userGetMovieListInfo = useSelector(state => state.userGetMovieList);
    const {error, myMoviesList} = userGetMovieListInfo;
    const userSignInInfo = useSelector(state => state.userSignIn);
    const {userInfo} = userSignInInfo;
    const onAddToList = () => {
        if(!userInfo) {
            alert('Please sign in, to add movie on your list.')
        } else {
            dispatch(userAddMovie(bannerData.poster_path, bannerData.title ? bannerData.title : bannerData.name, bannerData.vote_average, bannerData.overview, bannerData.id, type))
        }
    }
    const onDeleteFromList = () => {
        dispatch(userDeleteMovie(bannerData.id));
    }
    useEffect(() => {
        if(!myMoviesList) {
            dispatch(userGetMovieList());
        }
    }, [myMoviesList]);
    if(!bannerData || !bannerData.overview) {
        return (
            <div></div>
        )
    } else {
        return (
            <div className="movie-banner-holder" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerData.backdrop_path})`}}>
                <div className="overlay"></div>
                <div className="movie-banner-content">
                    <h1>
                        {bannerData.title ? (bannerData.title.length > 30 ? bannerData.title.substring(0, 30) + '...' : bannerData.title) : (bannerData.name.length > 30 ? bannerData.name.substring(0, 30) + '...' : bannerData.name)}
                    </h1>
                    <div className="movie-info">
                        <Rating vote={bannerData.vote_average} />
                        <p className="release-date">{bannerData.release_date ? bannerData.release_date : bannerData.first_air_date}</p>
                    </div>
                    <p className="description">
                        {bannerData.overview.length > 250 ? bannerData.overview.substring(0, 250) + '...' : bannerData.overview}
                    </p>
                    <div className="banner-btns">
                        <Link className="trailer-btn" to={`/details/${type}/${bannerData.id}`}>
                            <i className="fas fa-info"></i>
                            Details
                        </Link>
                        {
                            myMoviesList ? (
                                myMoviesList.length > 0 ? (
                                    myMoviesList.filter((item) => item.movie_id == bannerData.id)[0] ? (
                                        <button onClick={onDeleteFromList} className="add-to-my-list-btn" type="button">
                                            <i className="far fa-trash-alt"></i>
                                            Remove
                                        </button>
                                    ) : (
                                        <button onClick={onAddToList} className="add-to-my-list-btn" type="button">
                                            <i className="fas fa-plus"></i>
                                            Add To My List
                                        </button>
                                    )
                                ) : (
                                    <button onClick={onAddToList} className="add-to-my-list-btn" type="button">
                                        <i className="fas fa-plus"></i>
                                        Add To My List
                                    </button>
                                )
                            ) : (
                                <button onClick={onAddToList} className="add-to-my-list-btn" type="button">
                                    <i className="fas fa-plus"></i>
                                    Add To My List
                                </button>
                            )
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieBanner;
