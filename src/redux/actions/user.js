import { API } from "../../config";
import { USER_ADD_MOVIE_ERROR, USER_ADD_MOVIE_REQUEST, USER_ADD_MOVIE_SUCCESS, USER_DELETE_MOVIE_ERROR, USER_DELETE_MOVIE_REQUEST, USER_DELETE_MOVIE_SUCCESS, USER_GET_MOVIE_LIST_ERROR, USER_GET_MOVIE_LIST_REQUEST, USER_GET_MOVIE_LIST_SUCCESS, USER_SIGN_IN_ERROR, USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS, USER_SIGN_UP_ERROR, USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESS, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/user"

export const userSignIn = (email, password) => (dispatch) => {
    dispatch({type: USER_SIGN_IN_REQUEST});
    fetch(`${API}/api/signin`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => {
        if(data.err) {
            dispatch({type: USER_SIGN_IN_ERROR, payload: data.err})
        } else {
            dispatch({type: USER_SIGN_IN_SUCCESS, payload: data})
            localStorage.setItem("userInfo", JSON.stringify(data))
        }
    })
}

export const userSignUp = (name, email, password) => (dispatch) => {
    dispatch({type: USER_SIGN_UP_REQUEST});
    fetch(`${API}/api/signup`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password, name})
    })
    .then(response => response.json())
    .then(data => {
        if(data.err) {
            dispatch({type: USER_SIGN_UP_ERROR, payload: data.err})
        } else {
            dispatch({type: USER_SIGN_UP_SUCCESS, payload: data.user})
        }
    })
}

export const userUpdate = (name, email, password, image, token, _id) => (dispatch) => {
    dispatch({type: USER_UPDATE_REQUEST});
    fetch(`${API}/api/updateprofile`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password, name, image, _id})
    })
    .then(response => response.json())
    .then(data => {
        if(data.err) {
            dispatch({type: USER_UPDATE_ERROR, payload: data.err})
        } else {
            dispatch({type: USER_UPDATE_SUCCESS, payload: data.user})
            dispatch(userSignIn(email, password))
        }
    })
}

export const userGetMovieList = () => (dispatch, getState) => {
    dispatch({type: USER_GET_MOVIE_LIST_REQUEST});
    const {userSignIn: {userInfo}} = getState();
    if(userInfo) {
        const {token, user} = userInfo;
        const user_id = user._id;
        fetch(`${API}/api/getmymovielist/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.err) {
                dispatch({type: USER_GET_MOVIE_LIST_ERROR, payload: data.err})
            } else {
                dispatch({type: USER_GET_MOVIE_LIST_SUCCESS, payload: data.myMoviesList})
            }
        })
    }
}


export const userAddMovie = (movie_poster, movie_title, movie_vote, movie_overview, movie_id, movie_type) => (dispatch, getState) => {
    dispatch({type: USER_ADD_MOVIE_REQUEST});
    const {userSignIn: {userInfo}} = getState();
    const {token, user} = userInfo;
    const user_id = user._id;
    movie_poster = movie_poster ? movie_poster : "a";
    movie_overview = movie_overview ? movie_overview : "No description";
    fetch(`${API}/api/addmovie`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({movie_poster, movie_title, movie_vote, movie_overview, movie_id, movie_type, user_id})
    })
    .then(response => response.json())
    .then(data => {
        if(data.err) {
            dispatch({type: USER_ADD_MOVIE_ERROR, payload: data.err})
        } else {
            dispatch({type: USER_ADD_MOVIE_SUCCESS, payload: data.myMoviesList})
            dispatch(userGetMovieList());
        }
    })
}

export const userDeleteMovie = (movie_id) => (dispatch, getState) => {
    dispatch({type: USER_DELETE_MOVIE_REQUEST});
    const {userSignIn: {userInfo}} = getState();
    const {token, user} = userInfo;
    const user_id = user._id;
    fetch(`${API}/api/deletemovie`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({movie_id, user_id})
    })
    .then(response => response.json())
    .then(data => {
        if(data.err) {
            dispatch({type: USER_DELETE_MOVIE_ERROR, payload: data.err})
        } else {
            dispatch({type: USER_DELETE_MOVIE_SUCCESS, payload: data.myMoviesList})
            dispatch(userGetMovieList());
        }
    })
}
