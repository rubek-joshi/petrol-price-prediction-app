import {GET_RATES, GET_HISTORY, GET_PREDICTION} from '../actions';

const initialState = {
    latestRates: [],
    history: [],
    prediction: []
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
        case GET_PREDICTION:
            return {
                ...state,
                prediction: action.payload
            }
        default:
            return state;
    }
}