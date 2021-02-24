import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
}

export const AutoRide = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_AUTO_RIDE: return{
            ...state,
            isLoading: true
        }
        case ActionTypes.SUCCESS_AUTO_RIDE: return{
            ...state,
            isLoading: false
        }
        case ActionTypes.FAILURE_AUTO_RIDE: return{
            ...state,
            isLoading: false
        }    
        default: return state
    }
}

export default AutoRide
