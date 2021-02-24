import {
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE
} from './ActionTypes'

const initialState = {
    isLoading: false,
    userProfile: null,
    err: null
}

export const UserProfile = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PROFILE_REQUEST: return {...state, isLoading: true}
        case FETCH_USER_PROFILE_SUCCESS: return {isLoading: false, userProfile: action.userProfile, err: null}
        case FETCH_USER_PROFILE_FAILURE: return {isLoading: false, userProfile: null, err: action.err}
        default: return state;
    }
}