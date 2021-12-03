import { MOVIES_GENRES_REQUEST, MOVIES_GENRES_SUCCESS, MOVIES_GENRES_RESET, MOVIES_BY_GENRES_REQUEST, MOVIES_BY_GENRES_SUCCESS, MOVIES_BY_GENRES_RESET } from "../constants/genres"

export const getMoviesGenresReducer = (state={}, action) => {
    switch(action.type) {
        case MOVIES_GENRES_REQUEST:
            return {loading: true}
        case MOVIES_GENRES_SUCCESS:
            return {loading: false, moviesGenresData: action.payload}
        case MOVIES_GENRES_RESET:
            return {}
        default:
            return state
    }
}

export const getMoviesByGenresReducer = (state={}, action) => {
    switch(action.type) {
        case MOVIES_BY_GENRES_REQUEST:
            return {loading: true}
        case MOVIES_BY_GENRES_SUCCESS:
            return {loading: false, moviesByGenresData: action.payload}
        case MOVIES_BY_GENRES_RESET:
            return {}
        default:
            return state
    }
}
