import {GET_RATES, GET_HISTORY} from '../actions';

const initialState = {
    latestRates: [],
    history: []
}

export default (state = initialState, action) => {
    console.log(action);
    switch(action.type){
        case GET_RATES:
            return {
                ...state,
                latestRates: action.payload
            }
        case GET_HISTORY:
            return {
                ...state,
                history: action.payload
            }
        default:
            return state;
    }
}