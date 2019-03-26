import {combineReducers} from 'redux';

// Import all the reducers created for each part of the store
import authReducer from './auth';
import ratesReducer from './rates';

export default combineReducers({
    // fieldInStore: Reducer
    auth: authReducer,
    rates: ratesReducer
});