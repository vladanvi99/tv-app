import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAddMovie, userDeleteMovie, userGetMovieList } from '../../../redux/actions/user';
import Rating from '../../Rating/Rating';
import './css/movieItem.scss';

const MovieItem = ({movie, type}) => {
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
        <div className="movie-item-holder">
            <div className="movie-item-image">
                {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                ) : (
                    <div className="no-preview">
                        No image available
                    </div>
                )}
            </div>
            <div className="movie-item-info">
                <h3>
                    {movie.title ? (movie.title.length > 15 ? movie.title.substring(0, 15) + '...' : movie.title) : (movie.name.length > 15 ? movie.name.substring(0, 15) + '...' : movie.name)}
                </h3>
                <div className="rating-holder">
                    <Rating vote={movie.vote_average}/>
                </div>
                <p className="description">
                    {movie.overview.length > 60 ? movie.overview.substring(0, 60) + '...' : movie.overview}
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
    )
}

export default MovieItem;
