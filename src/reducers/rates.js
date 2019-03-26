import {GET_RATES} from '../actions';

const initialState = {
    latestRates: []
}

export default (state = initialState, action) => {
    console.log(action);
    switch(action.type){
        case GET_RATES:
            return {
                ...state,
                latestRates: action.payload
            }
        default:
            return state;
    }
}