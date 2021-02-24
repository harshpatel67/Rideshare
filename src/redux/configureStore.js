import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createForms } from 'react-redux-form';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Rides } from './rides';
import { AutoRide } from './autoRideReducer'
import { UserProfile } from './userProfileFetchReduce'
//import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            rides: Rides,
            auth: Auth,
            autoRide: AutoRide,
            userProfile: UserProfile
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}