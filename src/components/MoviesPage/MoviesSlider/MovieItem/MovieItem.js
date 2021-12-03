import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAddMovie, userDeleteMovie, userGetMovieList } from '../../../../redux/actions/user';

const MovieItem = ({movie, type}) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [moviePopUp, setMoviePopUp] = useState(false);
    const getMovieVideoUrl = () => {
        fetch(`https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=351e94f667108cdc271b0892fb6a48a4&language=en-US`)
        .then(response => response.json())
        .then(data => {
            if(data.results) {
                if(data.results[0]) {
                    setVideoUrl(`https://www.youtube.com/embed/${data.results[0].key}?autoplay=1&showinfo=0&controls=0&mute=1`)
                }
            }
        })
    }
    useEffect(() => {
        getMovieVideoUrl();
    }, [])
    const dispatch = useDispatch();
    const userGetMovieListInfo = useSelector(state => state.userGetMovieList);
    const {error, myMoviesList} = userGetMovieListInfo;
    const userSignInInfo = useSelector(state => state.userSignIn);
    const {userInfo} = userSignInInfo;
    const onAddToList = () => {
        if(!userInfo) {
            alert('Please sign in, to add movie on your list.')
        } else {
            dispatch(userAddMovie(movie.poster_path, movie.title ? movie.title : movie.name, movie.vote_average, movie.overview, movie.id, type))
        }
    }
    const onDeleteFromList = () => {
        dispatch(userDeleteMovie(movie.id));
    }
    useEffect(() => {
        if(!myMoviesList) {
            dispatch(userGetMovieList());
        }
    }, [myMoviesList]);
    return (
        <div onMouseLeave={() => setMoviePopUp(false)} key={movie.id} className="movie-holder">
            <div className="movie-img-holder" onMouseOver={() => setMoviePopUp(true)} onClick={() => setMoviePopUp(true)}>
                {movie.backdrop_path ? (
                    <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt={movie.title ? movie.title : movie.name} />
                ) : (
                    <div className="no-preview">
                        No image available
                    </div>
                )}
            </div>
            {
                moviePopUp && (
                    <div className="movies-info">
                        <div className="movies-info-video">
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
                            <div className='movie-description'>
                                <div className="close-pop-up">
                                    <button type="button" onClick={() => setMoviePopUp(false)}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            <div className="description-head">
                                <h3>
                                    {movie.title ? (movie.title.length > 18 ? movie.title.substring(0, 18) + '...' : movie.title) : (movie.name.length > 18 ? movie.name.substring(0, 18) + '...' : movie.name)}
                                </h3>
                            </div>
                            <div className="description-body">
                                <p>
                                    {movie.overview.length > 100 ? movie.overview.substring(0, 100) + '...' : movie.overview}
                                </p>
                                <div className="description-body-btns">
                                    <Link className="trailer-btn" to={`/details/${type}/${movie.id}`}>
                                        <i className="fas fa-info"></i>
                                        Details
                                    </Link>
                                    {
                                        myMoviesList ? (
                                            myMoviesList.length > 0 ? (
                                                myMoviesList.filter((item) => item.movie_id == movie.id)[0] ? (
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
                    </div>
                )
            }
        </div>
    )
}

export default MovieItem;