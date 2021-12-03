import { MOVIES_BANNER_REQUEST, MOVIES_BANNER_RESET, MOVIES_BANNER_SUCCESS, MOVIES_LIST_REQUEST, MOVIES_LIST_RESET, MOVIES_LIST_SUCCESS, MOVIES_POPULAR_REQUEST, MOVIES_POPULAR_RESET, MOVIES_POPULAR_SUCCESS, MOVIES_SINGLE_REQUEST, MOVIES_SINGLE_RESET, MOVIES_SINGLE_SUCCESS, MOVIES_TOP_RATED_REQUEST, MOVIES_TOP_RATED_RESET, MOVIES_TOP_RATED_SUCCESS, MOVIES_UPCOMING_REQUEST, MOVIES_UPCOMING_RESET, MOVIES_UPCOMING_SUCCESS } from "../constants/movies";

export const getTopRatedReducer = (state={}, action) => {
    switch(action.type) {
        case MOVIES_TOP_RATED_REQUEST:
            return {loading: true}
        case MOVIES_TOP_RATED_SUCCESS:
            return {loading: false, topRatedData: action.payload}
        case MOVIES_TOP_RATED_RESET:
            return {}
        default:
            return state
    }
}

export const getPopularReducer = (state={}, action) => {
    switch(action.type) {
        case MOVIES_POPULAR_REQUEST:
            return {loading: true}
        case MOVIES_POPULAR_SUCCESS:
            return {loading: false, popularData: action.payload}
        case MOVIES_POPULAR_RESET:
            return {}
        default:
            return state
    }
}

export const getUpcomingReducer = (state={}, action) => {
    switch(action.type) {
        case MOVIES_UPCOMING_REQUEST:
            return {loading: true}
        case MOVIES_UPCOMING_SUCCESS:
            return {loading: false, upcomingData: action.payload}
        case MOVIES_UPCOMING_RESET:
            return {}
        default:
            return state
    }
}

export const getBannerReducer = (state={}, action) => {
    switch(action.type) {
        case MOVIES_BANNER_REQUEST:
            return {loading: true}
        case MOVIES_BANNER_SUCCESS:
            return {loading: false, bannerData: action.payload}
        case MOVIES_BANNER_RESET:
            return {}
        default:
            return state
    }
}

export const getListReducer = (state={}, action) => {
    switch(action.type) {
        case MOVIES_LIST_REQUEST:
            return {loading: true}
        case MOVIES_LIST_SUCCESS:
            return {loading: false, listData: action.payload}
        case MOVIES_LIST_RESET:
            return {}
        default:
            return state
    }
}

export const getSingleReducer = (state={}, action) => {
    switch(action.type) {
        case MOVIES_SINGLE_REQUEST:
            return {loading: true}
        case MOVIES_SINGLE_SUCCESS:
            return {loading: false, singleData: action.payload}
        case MOVIES_SINGLE_RESET:
            return {}
        default:
            return state
    }
}
