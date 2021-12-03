import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGetMovieList } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';
import MovieItem from './MovieItem/MovieItem';
import './css/myMoviesList.scss';

const MyMoviesList = () => {
    const dispatch = useDispatch();
    const userGetMovieListInfo = useSelector(state => state.userGetMovieList);
    const {error, myMoviesList} = userGetMovieListInfo;
    const userSignInInfo = useSelector(state => state.userSignIn);
    const {userInfo} = userSignInInfo;
    const navigate = useNavigate();
    useEffect(() => {
        if(!userInfo) {
            navigate('/')
        }
    }, [userInfo])
    useEffect(() => {
        if(!myMoviesList) {
            dispatch(userGetMovieList());
        } else {
            console.log(myMoviesList)
        }
    }, [myMoviesList])
    if(myMoviesList && myMoviesList.length > 0) {
        return (
            <div className="my-list-wrap">
                {myMoviesList.map((movie) => (
                    <MovieItem movie={movie} type={movie.movie_type} key={movie.movie_id} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="my-list-wrap">
                <p className="no-items">You don't have movies on your list yet.</p>
            </div>
        )
    }
}

export default MyMoviesList;
