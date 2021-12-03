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
    const onDeleteFromList = () => {
        dispatch(userDeleteMovie(movie.movie_id));
    }
    useEffect(() => {
        if(!myMoviesList) {
            dispatch(userGetMovieList());
        }
    }, [myMoviesList]);
    return (
        <div className="movie-item-holder">
            <div className="movie-item-image">
                {movie.movie_poster && movie.movie_poster !== 'a' ? (
                    <img src={`https://image.tmdb.org/t/p/w300${movie.movie_poster}`} alt={movie.movie_title} />
                ) : (
                    <div className="no-preview">
                        No image available
                    </div>
                )}
            </div>
            <div className="movie-item-info">
                <h3>
                    {movie.movie_title && (movie.movie_title.length > 15 ? movie.movie_title.substring(0, 15) + '...' : movie.movie_title)}
                </h3>
                <div className="rating-holder">
                    <Rating vote={movie.movie_vote}/>
                </div>
                <p className="description">
                    {movie.movie_overview && movie.movie_overview.length > 60 ? movie.movie_overview.substring(0, 60) + '...' : movie.movie_overview}
                </p>
                <div className="description-body-btns">
                    <Link className="trailer-btn" to={`/details/${type}/${movie.movie_id}`}>
                        <i className="fas fa-info"></i>
                        Details
                    </Link>
                    <button onClick={onDeleteFromList} className="add-to-my-list-btn" type="button">
                        <i className="far fa-trash-alt"></i>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieItem;
