import { USER_ADD_MOVIE_ERROR, USER_ADD_MOVIE_REQUEST, USER_ADD_MOVIE_SUCCESS, USER_DELETE_MOVIE_ERROR, USER_DELETE_MOVIE_REQUEST, USER_DELETE_MOVIE_SUCCESS, USER_GET_MOVIE_LIST_ERROR, USER_GET_MOVIE_LIST_REQUEST, USER_GET_MOVIE_LIST_SUCCESS, USER_SIGN_IN_ERROR, USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS, USER_SIGN_OUT, USER_SIGN_UP_ERROR, USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESS, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/user";

export const userSignInReducer = (state={}, action) => {
    switch(action.type) {
        case USER_SIGN_IN_REQUEST:
            return {loading: true}
        case USER_SIGN_IN_ERROR:
            return {loading: false, error: action.payload}
        case USER_SIGN_IN_SUCCESS:
            return {loading: false, error: false, userInfo: action.payload}
        case USER_SIGN_OUT:
            return {}
        default:
            return state
    }
}

export const userSignUpReducer = (state={}, action) => {
    switch(action.type) {
        case USER_SIGN_UP_REQUEST:
            return {loading: true}
        case USER_SIGN_UP_ERROR:
            return {loading: false, error: action.payload}
        case USER_SIGN_UP_SUCCESS:
            console.log(action.payload)
            return {loading: false, error: false, success: true}
        case USER_SIGN_OUT:
            return {}
        default:
            return state
    }
}

export const userUpdateReducer = (state={}, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return {loading: true}
        case USER_UPDATE_ERROR:
            return {loading: false, error: action.payload}
        case USER_UPDATE_SUCCESS:
            return {loading: false, error: false, success: true}
        case USER_SIGN_OUT:
            return {}
        default:
            return state
    }
}

export const userAddMovieReducer = (state={}, action) => {
    switch(action.type) {
        case USER_ADD_MOVIE_REQUEST:
            return {loading: true}
        case USER_ADD_MOVIE_ERROR:
            return {loading: false, error: action.payload}
        case USER_ADD_MOVIE_SUCCESS:
            return {loading: false, error: false, success: true}
        default:
            return state
    }
}

export const userDeleteMovieReducer = (state={}, action) => {
    switch(action.type) {
        case USER_DELETE_MOVIE_REQUEST:
            return {loading: true}
        case USER_DELETE_MOVIE_ERROR:
            return {loading: false, error: action.payload}
        case USER_DELETE_MOVIE_SUCCESS:
            return {loading: false, error: false, success: true}
        default:
            return state
    }
}

export const userGetMovieListReducer = (state={}, action) => {
    switch(action.type) {
        case USER_GET_MOVIE_LIST_REQUEST:
            return {loading: true}
        case USER_GET_MOVIE_LIST_ERROR:
            return {loading: false, error: action.payload}
        case USER_GET_MOVIE_LIST_SUCCESS:
            return {loading: false, error: false, myMoviesList: action.payload}
        default:
            return state
    }
}
