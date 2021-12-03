import { MOVIE_API, MOVIE_API_KEY } from "../../config";
import { MOVIES_BY_GENRES_REQUEST, MOVIES_BY_GENRES_SUCCESS, MOVIES_GENRES_REQUEST, MOVIES_GENRES_SUCCESS } from "../constants/genres";

export const getMoviesGenres = ({type = 'movie'}) => (dispatch) => {
    dispatch({type: MOVIES_GENRES_REQUEST})
    fetch(`${MOVIE_API}/genre/${type}/list?api_key=${MOVIE_API_KEY}&language=en-US`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: MOVIES_GENRES_SUCCESS, payload: data});
    })
}

export const getMoviesByGenres = ({type = 'movie', by = 28, page = 1}) => (dispatch) => {
    dispatch({type: MOVIES_BY_GENRES_REQUEST})
    fetch(`${MOVIE_API}/discover/${type}?api_key=${MOVIE_API_KEY}&with_genres=${by}&page=${page}`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: MOVIES_BY_GENRES_SUCCESS, payload: data});
    })
}
