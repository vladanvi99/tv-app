import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './css/moviePage.scss';
import { getSingleMovies } from '../../redux/actions/movies';
import { MOVIES_SINGLE_RESET } from '../../redux/constants/movies';
import Rating from '../Rating/Rating';
import { userAddMovie, userDeleteMovie, userGetMovieList } from '../../redux/actions/user';

const MoviePage = () => {
    const [videoPopUp, setVideoPopUp] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const {movieId = '228', type = 'movie'} = useParams();
    const getSingleData = useSelector(state => state.getSingle);
    const {singleData} = getSingleData;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: MOVIES_SINGLE_RESET})
    }, [type, movieId]);
    const getMovieVideoUrl = () => {
        fetch(`https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=351e94f667108cdc271b0892fb6a48a4&language=en-US`)
        .then(response => response.json())
        .then(data => {
            if(data.results) {
                if(data.results[0]) {
                    setVideoUrl(`https://www.youtube.com/embed/${data.results[0].key}?autoplay=0&showinfo=0&controls=1&mute=1`)
                }
            }
        })
    }
    useEffect(() => {
        getMovieVideoUrl();
        if(!singleData) {
            if(!singleData) {
                dispatch(getSingleMovies({type, movieId}));
            }
        }
    }, [singleData])
    const userGetMovieListInfo = useSelector(state => state.userGetMovieList);
    const {error, myMoviesList} = userGetMovieListInfo;
    const userSignInInfo = useSelector(state => state.userSignIn);
    const {userInfo} = userSignInInfo;
    const onAddToList = () => {
        if(!userInfo) {
            alert('Please sign in, to add movie on your list.')
        } else {
            dispatch(userAddMovie(singleData.poster_path, singleData.title ? singleData.title : singleData.name, singleData.vote_average, singleData.overview, singleData.id, type))
        }
    }
    const onDeleteFromList = () => {
        dispatch(userDeleteMovie(singleData.id));
    }
    useEffect(() => {
        if(!myMoviesList) {
            dispatch(userGetMovieList());
        }
    }, [myMoviesList]);
    if(singleData) {
        return (
            <div className="movie-details-page">
                <div className="movie-details-holder">
                    <div className="movie-details-start">
                        <div className="details-start-content">
                            <div className="overlay"></div>
                            {
                                singleData.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w500${singleData.poster_path}`} alt={singleData.title} />
                                ) : (
                                    <div className="no-preview">
                                        No image available
                                    </div>
                                )
                            }
                            <button onClick={() => setVideoPopUp(true)} type="button" className="play-trailer-button">
                                <i className="fas fa-play"></i>
                                <span>
                                    Play Trailer
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="movie-details-end">
                        <div className="details-end-content">
                            <h2>{singleData.title ? singleData.title : singleData.name}</h2>
                            <div className="simple-info">
                                <Rating vote={singleData.vote_average} />
                                <p className="date-votes">{singleData.vote_count} <span>votes</span></p>
                                <p className="date-votes">{singleData.release_date ? singleData.release_date : singleData.first_air_date}</p>
                            </div>
                            <div className="genres-info">
                                {
                                    singleData.genres.map((genre) => {
                                        return <span key={genre.id}>{genre.name}</span>
                                    })
                                }
                            </div>
                            <p className="description">
                                {singleData.overview}
                            </p>
                            <div className="add-to-my-cart-holder">
                                {
                                    myMoviesList ? (
                                        myMoviesList.length > 0 ? (
                                            myMoviesList.filter((item) => item.movie_id == singleData.id)[0] ? (
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
                </div>
                <div style={{display: `${videoPopUp ? 'block' : 'none'}`}} className="movies-video-pop-up">
                    <div className="close-wrap">
                        <button type="button" onClick={() => setVideoPopUp(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="video-holder">
                        {
                            videoUrl === '' ? (
                                <div className="no-preview">
                                    No video available
                                </div>
                            ) : (
                                <iframe
                                    src={videoUrl}>
                                </iframe> 
                            )
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default MoviePage;
