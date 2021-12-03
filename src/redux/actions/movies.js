import { MOVIE_API } from "../../config";
import { MOVIE_API_KEY } from "../../config";
import { MOVIES_BANNER_REQUEST, MOVIES_BANNER_SUCCESS, MOVIES_LIST_REQUEST, MOVIES_LIST_SUCCESS, MOVIES_POPULAR_REQUEST, MOVIES_POPULAR_SUCCESS, MOVIES_SINGLE_REQUEST, MOVIES_SINGLE_SUCCESS, MOVIES_TOP_RATED_REQUEST, MOVIES_TOP_RATED_SUCCESS, MOVIES_UPCOMING_REQUEST, MOVIES_UPCOMING_SUCCESS } from '../constants/movies';

export const getTopRatedMovies = ({page=1, type = 'movie'}) => (dispatch) => {
    dispatch({type: MOVIES_TOP_RATED_REQUEST})
    fetch(`${MOVIE_API}/${type}/top_rated?api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: MOVIES_TOP_RATED_SUCCESS, payload: data});
    })
}

export const getPopularMovies = ({page=1, type = 'movie'}) => (dispatch) => {
    dispatch({type: MOVIES_POPULAR_REQUEST})
    fetch(`${MOVIE_API}/${type}/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: MOVIES_POPULAR_SUCCESS, payload: data});
    })
}

export const getUpcomingMovies = ({page=1, type = 'movie', link = 'upcoming'}) => (dispatch) => {
    dispatch({type: MOVIES_UPCOMING_REQUEST})
    fetch(`${MOVIE_API}/${type}/${link}?api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: MOVIES_UPCOMING_SUCCESS, payload: data});
    })
}

export const getBannerMovie = ({movies_shows='top_rated', type = 'movie'}) => (dispatch) => {
    dispatch({type: MOVIES_BANNER_REQUEST})
    fetch(`${MOVIE_API}/${type}/${movies_shows}?api_key=${MOVIE_API_KEY}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: MOVIES_BANNER_SUCCESS, payload: data});
    })
}

export const getListMovies = ({page=1, type = 'movie', by = 'top_rated'}) => (dispatch) => {
    dispatch({type: MOVIES_LIST_REQUEST})
    fetch(`${MOVIE_API}/${type}/${by}?api_key=${MOVIE_API_KEY}&language=en-US&page=${page}`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: MOVIES_LIST_SUCCESS, payload: data});
    })
}

export const getSingleMovies = ({type = 'movie', movieId = '228'}) => (dispatch) => {
    dispatch({type: MOVIES_SINGLE_REQUEST})
    fetch(`${MOVIE_API}/${type}/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: MOVIES_SINGLE_SUCCESS, payload: data});
    })
}
