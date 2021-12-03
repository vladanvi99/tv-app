import { compose, combineReducers, applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import { getMoviesByGenresReducer, getMoviesGenresReducer } from "./reducers/genres";
import { getBannerReducer, getListReducer, getPopularReducer, getSingleReducer, getTopRatedReducer, getUpcomingReducer } from "./reducers/movies";
import { userAddMovieReducer, userDeleteMovieReducer, userGetMovieListReducer, userSignInReducer, userSignUpReducer, userUpdateReducer } from "./reducers/user";

const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    }
};
const reducer = combineReducers({
    getTopRated: getTopRatedReducer,
    getPopular: getPopularReducer,
    getBanner: getBannerReducer,
    getUpcoming: getUpcomingReducer,
    getMoviesGenres: getMoviesGenresReducer,
    getList: getListReducer,
    getMoviesByGenres: getMoviesByGenresReducer,
    getSingle: getSingleReducer,
    userSignIn: userSignInReducer,
    userSignUp: userSignUpReducer,
    userUpdate: userUpdateReducer,
    userAddMovie: userAddMovieReducer,
    userGetMovieList: userGetMovieListReducer,
    userDeleteMovie: userDeleteMovieReducer
});
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
export default store;
